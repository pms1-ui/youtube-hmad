#!/usr/bin/env node
/**
 * MCP sanitizing proxy (stdio <-> stdio, wrapping mcp-remote)
 *
 * 목적: 원격 MCP 서버(예: Higgsfield mcp.higgsfield.ai/mcp)가 내려주는 tools/list 응답에서
 *   input_schema 최상위의 anyOf / oneOf / allOf 를 평탄화(flatten)해서,
 *   Anthropic API의 "input_schema does not support oneOf/allOf/anyOf at the top level"
 *   400 에러를 회피한다.
 *
 * 구조:
 *   Kiro (stdio) <-> [이 프록시] (stdio) <-> mcp-remote (OAuth + Streamable HTTP) <-> 원격 서버
 *   - OAuth 브라우저 로그인은 자식 프로세스 mcp-remote 가 처리한다(로그인창 자동 오픈).
 *   - 이 프록시는 자식의 stdout(JSON-RPC)을 가로채 tools/list 결과만 sanitize 후 Kiro 로 전달.
 *   - Kiro -> 자식 방향(stdin)은 그대로 통과.
 *
 * 사용: node tools/mcp-sanitize-proxy.mjs <REMOTE_MCP_URL> [callback-port]
 *   Kiro mcp.json:
 *     "command": "node",
 *     "args": ["tools/mcp-sanitize-proxy.mjs", "https://mcp.higgsfield.ai/mcp"]
 *
 * 의존성: mcp-remote (npx 로 자동 실행). Node 18+.
 */

import { spawn } from "node:child_process";

const REMOTE_URL = process.argv[2];
const CALLBACK_PORT = process.argv[3]; // optional
if (!REMOTE_URL) {
  process.stderr.write("[proxy] REMOTE_MCP_URL argument required\n");
  process.exit(1);
}

function log(...a) {
  process.stderr.write("[proxy] " + a.join(" ") + "\n");
}

/** JSON Schema 최상위 anyOf/oneOf/allOf 를 type:object 로 평탄화 */
function flattenTopLevelComposition(schema) {
  if (!schema || typeof schema !== "object") return schema;
  const comboKey = ["anyOf", "oneOf", "allOf"].find(
    (k) => Array.isArray(schema[k]) && schema[k].length > 0
  );
  if (comboKey) {
    const branches = schema[comboKey].filter((b) => b && typeof b === "object");
    const mergedProps = {};
    const requiredSets = [];
    const branchDescr = [];
    for (const branch of branches) {
      const b = flattenTopLevelComposition(branch);
      if (b.properties && typeof b.properties === "object") {
        for (const [k, v] of Object.entries(b.properties)) {
          if (!(k in mergedProps)) mergedProps[k] = v;
        }
      }
      if (Array.isArray(b.required)) requiredSets.push(b.required);
      const keys = b.properties ? Object.keys(b.properties) : [];
      if (keys.length) branchDescr.push("{" + keys.join(", ") + "}");
    }
    let intersection = [];
    if (requiredSets.length === branches.length && requiredSets.length > 0) {
      intersection = requiredSets.reduce((acc, cur) =>
        acc.filter((x) => cur.includes(x))
      );
    }
    const flattened = { type: "object", properties: mergedProps };
    if (intersection.length) flattened.required = intersection;
    for (const [k, v] of Object.entries(schema)) {
      if (["anyOf", "oneOf", "allOf", "properties", "required", "type"].includes(k)) continue;
      flattened[k] = v;
    }
    const hint = "Valid parameter combinations: " + branchDescr.join(" OR ");
    flattened.description = flattened.description ? flattened.description + " " + hint : hint;
    return flattened;
  }
  if (!schema.type) {
    return { type: "object", properties: schema.properties || {}, ...schema };
  }
  // 중첩 properties 안의 조합은 Anthropic 이 허용하므로 최상위만 건드린다.
  return schema;
}

function sanitizeMessage(m) {
  if (m && m.result && Array.isArray(m.result.tools)) {
    for (const tool of m.result.tools) {
      if (tool && tool.inputSchema) tool.inputSchema = flattenTopLevelComposition(tool.inputSchema);
      if (tool && tool.input_schema) tool.input_schema = flattenTopLevelComposition(tool.input_schema);
    }
    log("sanitized tools/list:", m.result.tools.length, "tools");
  }
  return m;
}

// mcp-remote 자식 프로세스 실행 (OAuth + HTTP 담당)
const childArgs = ["-y", "mcp-remote@latest", REMOTE_URL];
if (CALLBACK_PORT) childArgs.push(CALLBACK_PORT);

const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(npxCmd, childArgs, {
  stdio: ["pipe", "pipe", "inherit"], // stderr(로그인 URL 등)는 그대로 사용자에게
  shell: process.platform === "win32",
});

child.on("exit", (code) => {
  log("child mcp-remote exited:", code);
  process.exit(code ?? 0);
});
child.on("error", (e) => {
  log("child spawn error:", e.message);
  process.exit(1);
});

// Kiro(stdin) -> 자식(stdin): 그대로 통과
process.stdin.pipe(child.stdin);

// 자식(stdout) -> Kiro(stdout): 줄단위 파싱 후 tools/list sanitize
let buf = "";
child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  buf += chunk;
  let idx;
  while ((idx = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, idx);
    buf = buf.slice(idx + 1);
    const trimmed = line.trim();
    if (!trimmed) {
      process.stdout.write("\n");
      continue;
    }
    let msg;
    try {
      msg = JSON.parse(trimmed);
    } catch {
      // JSON 아니면(로그 등) 그대로 통과
      process.stdout.write(line + "\n");
      continue;
    }
    const out = sanitizeMessage(msg);
    process.stdout.write(JSON.stringify(out) + "\n");
  }
});

log("started. wrapping mcp-remote ->", REMOTE_URL);
