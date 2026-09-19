# Supadata API — 유튜브/영상 자막(transcript) 추출

로컬 IP가 YouTube 자막 엔드포인트에 429/IpBlocked로 막힐 때, Supadata API로 우회 추출한다.
(youtube-transcript-api·yt-dlp 자막 다운로드가 실패할 때 이 방법 사용)

## 인증
- API Key: `.env` 의 `SUPADATA_API_KEY` (헤더 `x-api-key`로 전달)
- Base URL: `https://api.supadata.ai/v1`

## 핵심 엔드포인트 — 단건 transcript
```
GET https://api.supadata.ai/v1/transcript
헤더: x-api-key: <KEY>
쿼리 파라미터:
  url    : 영상 URL (YouTube/TikTok/IG/X/FB/파일). 예) https://www.youtube.com/shorts/VIDEOID
           (또는 youtube 전용 엔드포인트에서는 videoId 사용 가능)
  lang   : 선호 언어 ISO 639-1 (예: ko, en). 없으면 첫 번째 가용 언어
  text   : true 면 plain text 로 반환 (권장)
  mode   : native(기존자막만) | generate(항상 AI생성) | auto(기본; native 실패시 generate)
```

### 응답 (동기)
```json
{ "content": "전체 텍스트...", "lang": "ko", "availableLangs": ["ko","en"] }
```
- 영상이 너무 길면 `{ "jobId": "..." }` 반환 → `GET /v1/transcript/{jobId}` 로 폴링.
- 쇼츠는 짧아서 대부분 동기 응답.

## youtube 전용 엔드포인트 (대안)
```
GET https://api.supadata.ai/v1/youtube/transcript?videoId=VIDEOID&lang=ko&text=true
POST https://api.supadata.ai/v1/youtube/transcript/batch   # videoIds 배열, 비동기(jobId)
```

## 예시 (curl)
```
curl -H "x-api-key: <KEY>" \
  "https://api.supadata.ai/v1/transcript?url=https://www.youtube.com/shorts/vQcqByCo19A&lang=ko&text=true"
```

## 참고
- 문서: https://docs.supadata.ai/api-reference/introduction
- transcript 상세: https://docs.supadata.ai/api-reference/endpoint/transcript/transcript
