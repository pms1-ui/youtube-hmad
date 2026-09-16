#!/usr/bin/env bash
# 자막 생성 간편 실행기 — venv 파이썬을 자동으로 물려서 make_srt.py 실행
#
# 사용법:
#   bash tools/srt.sh <오디오> <대본> [추가옵션...]
# 예:
#   bash tools/srt.sh audio/result/v7.mp3 script/longform/v7_....md
#   bash tools/srt.sh audio/result/v7.mp3 script/longform/v7_....md --max-chars 20
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PY="$ROOT/.venv-subtitle/bin/python"
if [ ! -x "$PY" ]; then
  echo "[srt] venv 파이썬이 없습니다: $PY"
  echo "[srt] 먼저 환경 세팅이 필요합니다 (.venv-subtitle)."
  exit 1
fi
exec "$PY" "$ROOT/tools/make_srt.py" "$@"
