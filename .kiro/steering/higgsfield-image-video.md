---
inclusion: manual
---

# 통짜 장면 이미지 → Higgsfield 영상화 워크플로우 (신규 프로세스)

**목적:** 캐릭터 + 현대 한국 배경 + 오브젝트가 한 화면에 담긴 **통짜 장면 이미지**를
로컬 GPT Image 2로 생성하고, 그 이미지를 **Higgsfield에 통으로 업로드해 살아있는 영상**으로 만든다.

> ⚠️ 이건 기존 두 워크플로우와 **완전히 다른 독립 프로세스**다. 혼동 금지.
> - `character-images.md`: 흰/검정 배경 캐릭터 → **rembg 투명화** → Remotion 오버레이용 포즈 컷. (배경 제거함)
> - `higgsfield-video-workflow.md`: 힉스필드 자체 `gpt_image_2`로 레퍼런스 만들고 seedance로 영상화 (밀리터리 톤, omni_reference).
> - **이 문서**: 로컬 GPT Image 2 `/v1/images/edits`로 **배경·오브젝트까지 포함한 완성 장면**을 생성(투명화 X, 배경 유지) → 힉스필드에 **이미지 통째 업로드** → 영상화.

---

## 0. 기본값 (사용자가 다르게 지정하지 않으면 이대로)

| 항목 | 값 |
|------|-----|
| 이미지 모델 | OpenAI `gpt-image-2` (**반드시 image-2. image-1 금지**) |
| 엔드포인트 | `https://api.openai.com/v1/images/edits` (참조 이미지 전송 방식) |
| 참조 이미지 | `img/character-v2.png` (**항상 `image[]`로 함께 전송**) |
| Quality | **`medium`** (기본. high는 느리고 비쌈 — 특별 요청 시에만) |
| 롱폼 해상도 | `1536x1024` (16:9 가로) |
| 숏폼 해상도 | `1024x1536` (9:16 세로) |
| 배경 처리 | **투명화 안 함.** 배경·오브젝트 그대로 유지 (통짜 장면) |
| API 키 | `.env`의 `OPENAI_API_KEY` |
| 배경 톤 | 현대적인 한국 (헬스장, 도심, 아파트, 카페, 거리 등) |
| 영상 모델(Higgsfield) | **Grok Imagine 1.5** = model id **`grok_video_v15`** (xAI, 검증됨) |
| 영상 길이 | **6초** (`duration: 6`, 허용 2~15) |
| 영상 화질 | **720p** (`resolution: "720p"`, 허용 480p/720p/1080p) |
| 영상 비율 | **파라미터 없음** — `start_image`(통짜 이미지)의 비율을 그대로 따라감. 롱폼 1536×1024 / 숏폼 1024×1536 이미지 넣으면 그대로 16:9 / 9:16 |
| 이미지 입력 | 통짜 장면 PNG를 **`start_image` 역할**로 전달 (grok_video_v15 medias roles: start_image / image_references / audio_references) |

---

## 1. 캐릭터 정의 (character-v2.png)

- 은색 메탈릭 근육질 바디빌더 바디
- **눈코입 없는 매끈한 은색 얼굴** (까만 얼굴/고개 숙임 아님)
- **HMAD 글씨가 적힌 검정 캡모자**
- 상의 탈의(shirtless), **검정 반바지**, 흰 스니커즈

**프롬프트 캐릭터 고정 문구 (항상 포함):**
```
The exact same character as the reference image: a silver metallic muscular bodybuilder with a smooth featureless silver face (no eyes, no nose, no mouth), wearing a black cap with "HMAD" text, shirtless with defined silver muscles, black shorts, white sneakers.
```

---

## 2. 이미지 생성 규칙 (기존 캐릭터컷과 다른 점)

- **배경/오브젝트를 프롬프트에 적극 묘사** — 캐릭터만이 아니라 "어디서 무엇을 하는 장면"인지 통짜로.
- **현대 한국 배경 우선**: `modern Korean gym`, `Seoul city street at night`, `modern Korean apartment interior`, `Korean cafe`, `subway station` 등 구체적으로.
- **투명화·rembg 금지.** 생성된 PNG를 그대로 힉스필드에 업로드한다.
- 캐릭터를 화면에 **너무 크게 정면 클로즈업으로 박지 말 것** — 배경 속에 자연스럽게 녹인 구도(전신·중경)로. 그래야 힉스필드가 영상화할 때 카메라·모션 여지가 생긴다.
- 카메라/구도 키워드로 영상화 유리하게: `cinematic wide shot`, `natural depth of field`, `dynamic composition`, `room to move`.
- 프롬프트 끝 공통: `ultra high quality, 8K detail, photorealistic metallic skin texture, cinematic lighting`.
- 유혈/폭력/노출 순화: 필요 시 `no blood, no graphic content`.

### 프롬프트 템플릿
```
[캐릭터 고정 문구] The character is [행동/포즈] in [현대 한국 배경 구체 묘사], with [오브젝트/소품]. [카메라·구도 키워드]. ultra high quality, 8K detail, photorealistic metallic skin texture, cinematic lighting.
```
예시(롱폼): 
```
The exact same character as the reference image: a silver metallic muscular bodybuilder with a smooth featureless silver face (no eyes, no nose, no mouth), wearing a black cap with "HMAD" text, shirtless, black shorts, white sneakers. The character is running on a treadmill in a modern Korean gym with large windows showing a Seoul city skyline, other machines blurred in the background. Cinematic wide shot, natural depth of field, dynamic composition. ultra high quality, 8K detail, photorealistic metallic skin texture, cinematic lighting.
```

---

## 3. 저장 경로 (신규)

```
img/higgsfield_src/longform/     ← 생성한 통짜 장면 이미지 (16:9, 1536x1024)
img/higgsfield_src/shortform/    ← 생성한 통짜 장면 이미지 (9:16, 1024x1536)
video_output/higgsfield/<주제>_<YYMMDD>/  ← 힉스필드 영상 결과 (.mp4)
```
- 이미지 파일명: `<주제>_01.png`, `_02.png` … (장면 순서).
- 영상 파일명: `01_<짧은영문설명>.mp4` … (장면 순서). 레퍼런스/소스 이미지도 함께 보관 가능.

---

## 4. 이미지 생성 실행 (병렬 필수)

`.env`에서 키를 읽고, PowerShell `Start-Job`으로 **5개씩 병렬** 생성. 직렬 금지.

> ⚠️ **아래 6번 "PowerShell 반복 실수 방지"를 반드시 먼저 읽을 것.** 프롬프트를 스크립트에 인라인하면 이스케이프/인코딩으로 매번 깨진다. **프롬프트는 별도 txt 파일(한 줄=한 장면)에 저장하고 읽어오는 방식**이 검증된 안정 패턴이다.

**① 프롬프트 파일**: `tools/_scene_prompts.txt` 에 한 줄에 한 장면씩 저장(캐릭터 고정 문구 포함, 전부 영문, `"` 큰따옴표 쓰지 말고 `HMAD text on it` 처럼 서술).

**② 생성 스크립트** `tools/_gen_scenes.ps1` (전부 ASCII, 절대경로, quality medium):
```powershell
$ErrorActionPreference = "Stop"
$root = (Get-Location).Path                 # 절대경로 필수 (Start-Job은 홈에서 실행됨)
$key = (Get-Content "$root/.env" | Where-Object { $_ -match '^OPENAI_API_KEY=' }) -replace '^OPENAI_API_KEY=', ''
$imgPath = "$root/img/character-v2.png"
$size = "1536x1024"                          # 롱폼. 숏폼은 "1024x1536"
$outDir = "$root/img/higgsfield_src/longform"
$prefix = "topic_name"                       # 영문 prefix (한글 금지 — 인코딩 깨짐)

$scenes = Get-Content "$root/tools/_scene_prompts.txt" -Encoding UTF8 | Where-Object { $_.Trim() -ne "" }
Write-Output "SCENES=$($scenes.Count) KEYLEN=$($key.Length) IMG=$(Test-Path $imgPath)"

$jobs = @()
for ($i = 0; $i -lt $scenes.Count; $i++) {
  $num = "{0:D2}" -f ($i + 1)
  $out = "$outDir/${prefix}_$num.b64json"
  $jobs += Start-Job -ScriptBlock {
    param($key, $prompt, $imgPath, $size, $out)
    $r = curl.exe -s -X POST "https://api.openai.com/v1/images/edits" `
      -H "Authorization: Bearer $key" `
      -F "model=gpt-image-2" -F "prompt=$prompt" `
      -F "size=$size" -F "quality=medium" `
      -F "image[]=@$imgPath" -o $out -w "%{http_code}"
    "HTTP=$r OUT=$out SIZE=$((Get-Item $out -EA SilentlyContinue).Length)"
  } -ArgumentList $key, $scenes[$i], $imgPath, $size, $out
  if ((($i + 1) % 5) -eq 0) { $jobs | Wait-Job | Out-Null }   # 5개씩 배치
}
$jobs | Wait-Job | Receive-Job; $jobs | Remove-Job
Write-Output "GEN_DONE"
```
- **실행은 백그라운드 프로세스로**: `powershell -ExecutionPolicy Bypass -File tools/_gen_scenes.ps1` (medium 기준 장당 30~90초).
- 파일 생성 확인: `Get-ChildItem "$outDir/${prefix}_*.b64json"` (각 3MB대면 정상, 수백 바이트면 에러 응답).

**③ 디코딩** `tools/_decode_scenes.ps1` (b64json → PNG, **투명화 없음**):
```powershell
$root = (Get-Location).Path
$dir = "$root/img/higgsfield_src/longform"
Get-ChildItem "$dir/topic_name_*.b64json" | Sort-Object Name | ForEach-Object {
  $json = [System.IO.File]::ReadAllText($_.FullName) | ConvertFrom-Json
  $bytes = [System.Convert]::FromBase64String($json.data[0].b64_json)
  [System.IO.File]::WriteAllBytes(($_.FullName -replace '\.b64json$', '.png'), $bytes)
  Remove-Item $_.FullName
}
```
- 응답은 `data[0].b64_json`(Base64 PNG). 디코딩 후 **b64json 임시파일 삭제**.
- **투명화(rembg) 단계 없음** — 저장한 PNG가 곧 힉스필드 업로드 소스.
- 작업 끝나면 `tools/_gen_scenes.ps1`, `_scene_prompts.txt`, `_decode_scenes.ps1` 임시파일 삭제.

---

## 5. Higgsfield 영상화

> Higgsfield MCP 연결 전제. `balance` 호출로 세션 확인. "session expired"면 커넥터 재추가로 로그인 트리거.

1. **이미지 업로드/등록**: 생성한 통짜 장면 PNG를 Higgsfield에 업로드해 image job_id 확보.
2. **영상 생성**: 업로드한 이미지를 **시작 프레임(start_image) 또는 소스 이미지**로 사용해 image-to-video 생성.
   - ⚠️ 여기서는 기존 `higgsfield-video-workflow.md`와 반대다. 그 문서는 레퍼런스를 `image_references`로만 쓰고 start/end 금지였지만,
     **이 프로세스는 "완성된 장면 이미지를 통째로 영상화"가 목적**이므로 이미지를 시작 프레임/소스로 직접 사용한다.
   - **모델 id: `grok_video_v15`** (Grok Imagine 1.5) / `duration: 6` / `resolution: "720p"`.
     - **비율 파라미터 없음** — 통짜 이미지를 `start_image`로 넣으면 그 비율(롱폼 16:9 / 숏폼 9:16)로 나온다.
     - `generate_video` 호출 예:
       ```
       params: {
         model: "grok_video_v15",
         prompt: "<움직임/카메라 묘사>",
         duration: 6,
         resolution: "720p",
         medias: [{ value: "<업로드한 이미지 media_id 또는 job_id>", role: "start_image" }]
       }
       ```
   - 프롬프트: 그 장면에서 **어떤 움직임/카메라 워크**를 줄지 묘사 (예: "the character runs steadily, camera slowly pushes in, sweat glistens, background lights bokeh").
3. **배치 처리**: 장면 여러 개면 `generate_video_batch`로 병렬 제출, stable index 부여.
4. **제출 실패 대응** (기존 문서와 동일):
   - 프리셋 추천 막힘 → `declined_preset_id` 붙여 재제출.
   - NSFW 필터 → 묘사 순화 후 재생성.
   - Out of credits → `balance` 확인 후 재시도.
5. **완료 대기**: `jobs_wait`로 그룹 폴링, all_terminal까지.

---

## 6. 로컬 다운로드 (마지막)

- 경로: `video_output/higgsfield/<주제>_<YYMMDD>/`
- PowerShell `Invoke-WebRequest`, **반드시 `$ProgressPreference='SilentlyContinue'` 먼저**.
- 다운로드 후 `Get-ChildItem`으로 크기 확인해 깨짐/누락 검증.

## 7. 정리 & 보고

- 로컬 저장·검증 완료 후에만 Higgsfield Assets 정리 안내 (MCP 개별 삭제 불가 → 웹 대시보드 수동).
- 장면별 이미지/영상 파일명·상태 표로 보고. 사용자에게 직접 영상 확인 요청.

---

## ★★ 트러블슈팅 — 반복 실수 방지 (겪은 실패 그대로 기록) ★★

이 워크플로우에서 **실제로 시간을 날린 3가지 함정**. 같은 증상 보이면 아래 처방 즉시 적용, 헤매지 말 것.

### 함정 1. PowerShell 스크립트 파싱 에러 (`예기치 않은 토큰`, `" 종결자가 없습니다`)
- **증상**: 프롬프트에 큰따옴표(예: `"HMAD"`)나 특수문자가 있으면, `$scenes = @("...")` 인라인 배열이 통째로 깨지며 엉뚱한 라인에서 파싱 에러.
- **원인**: 프롬프트 안의 `"` 가 PowerShell 문자열 종결자와 충돌.
- **처방**: 프롬프트를 **스크립트에 인라인하지 말고 별도 txt 파일(한 줄=한 장면)에 저장 → `Get-Content`로 읽기.** 프롬프트 안엔 `"` 대신 서술형(`HMAD text on it`) 사용.

### 함정 2. 한글이 든 .ps1 을 `powershell -File`로 실행 시 파싱 에러
- **증상**: 프롬프트/주석과 무관한 멀쩡한 라인(변수 대입 등)에서 갑자기 `" 종결자가 없습니다` 에러.
- **원인**: 파일에 한글(`$prefix = "러닝머신..."`, 한글 주석)이 있으면 `powershell -File` 실행 시 인코딩 오독으로 따옴표 짝이 깨짐.
- **처방**: **.ps1 파일은 전부 ASCII로 작성.** prefix 등은 영문(`treadmill_vs_cycle`)으로. 한글이 꼭 필요하면 파일명은 나중에 바꾸고 스크립트 자체엔 한글 금지.

### 함정 3. Start-Job 안에서 상대경로 → 파일이 하나도 안 생김
- **증상**: 스크립트는 `GEN_DONE` 찍고 정상 종료했는데, `img/higgsfield_src/...`에 결과 파일이 0개.
- **원인**: `Start-Job` 블록은 **홈 디렉토리에서 실행**된다. `img/character-v2.png`, `$outDir` 같은 상대경로가 워크스페이스 기준이 아니라 홈 기준으로 잡혀 curl 입출력이 엉뚱한 곳으로.
- **처방**: **잡에 넘기는 모든 경로를 절대경로로.** 스크립트 상단에 `$root = (Get-Location).Path` 두고 `"$root/img/..."` 형태로 전달. 검증용으로 잡에서 `HTTP=$r SIZE=...` 문자열을 반환하게 해두면 실패 즉시 발견.

### 공통 원칙
- 장기 이미지 생성은 **백그라운드 프로세스**로 돌리고 `Get-ChildItem`으로 파일 크기 폴링(일반 실행은 타임아웃).
- 파일 크기로 성공 판단: 정상 이미지 응답 b64json은 **3MB대**, 에러 응답(JSON)은 수백~수천 바이트.
- 첫 응답 앞부분만 `[System.IO.File]::ReadAllText($f).Substring(0,80)`로 확인해 `data`/`b64_json` 구조인지 검증 후 일괄 디코딩.

---

## MCP 등록 (사용자 직접) — ⚠️ 반드시 sanitize 프록시 경유

### 문제: 최상위 anyOf 스키마 → 400 에러
- 힉스필드 MCP를 `url` 방식으로 직접 연결하면 아래 에러로 **모든 대화가 막힌다**:
  `tools.N.custom.input_schema: input_schema does not support oneOf, allOf, or anyOf at the top level`
- 원인: 힉스필드 도구 중 일부의 `input_schema` 최상위가 `anyOf/oneOf/allOf`인데, Anthropic 계열 API는 이를 금지.
  Kiro가 전체 도구 리스트를 매 요청마다 보내므로 400이 반복돼 세션이 아예 불가.

### 해결: 로컬 sanitize 프록시 (`tools/mcp-sanitize-proxy.mjs`)
- 구조: `Kiro(stdio) ↔ 프록시(stdio) ↔ mcp-remote(OAuth+HTTP) ↔ 힉스필드`
- 프록시가 `tools/list` 응답의 최상위 조합 키워드를 `type:object`로 평탄화 → 400 원인 제거.
- OAuth 브라우저 로그인은 자식 `mcp-remote`가 처리(토큰은 `~/.mcp-auth`에 캐시 → 이후 재로그인 불필요).
- **검증됨**: 도구 98개 전부 sanitize, 남은 문제 도구 0개.

### mcp.json 설정 (url 방식 금지, 아래 command 방식으로)
```json
    "higgsfield": {
      "command": "node",
      "args": [
        "d:\\kiro\\youtube\\tools\\mcp-sanitize-proxy.mjs",
        "https://mcp.higgsfield.ai/mcp"
      ],
      "disabled": false
    }
```
- 이 파일(mcp.json)은 에이전트가 편집 불가(권한 차단) → 사용자가 직접 교체.
- 평소 쓰지 않을 땐 `"disabled": true`로 꺼둬도 무방(켜져 있어도 프록시 덕에 에러 없음).
- 최초 1회는 브라우저 로그인 필요. "session expired" 시 `~/.mcp-auth` 삭제 후 재연결하면 재로그인.

## 임시파일 규칙
- `_scene-*.b64json`, `_*.py` 등 작업 임시파일은 처리 직후 삭제.
