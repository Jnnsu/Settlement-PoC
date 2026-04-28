import { normalizeResult } from "../utils/normalize";

const buildPrompt = (inputText) => {
  const lines = [
    "너는 목표 분석 JSON 생성기다.",
    "",
    "반드시 규칙을 지켜라:",
    "- JSON만 출력 (설명, 백틱, 코드블록 절대 금지)",
    "- category는 아래 목록 중 하나만 정확히 선택",
    "- emoji는 해당 목표를 가장 잘 표현하는 이모지 단 하나",
    "- title은 반드시 10자 이내 명사형으로 (예: 마라톤 완주, 책 24권 읽기)",
    "- min_value와 max_value는 목표 달성의 의미 있는 범위를 숫자+단위 조합으로 제시",
    "",
    "카테고리 목록 (이 중 하나만):",
    "건강·운동, 자기계발·독서, 여행·경험, 커리어·직무, 재테크·금융, 인간관계, 창작·취미, 학습·공부, 기타",
    "",
    "이모지 규칙:",
    "- category와 의미적으로 맞아야 한다",
    "- 추상적 이모지 금지 (✨🔥🚀 등)",
    "- 실제 행동/대상을 나타내는 이모지 사용",
    "",
    "수치 규칙:",
    "- 반드시 숫자와 단위(회, 권, 점 등) 조합으로 표현",
    "- 최소값과 최대값 모두 제시 (예: 1회 ~ 3회, 5권 ~ 12권, 900점 ~ 950점)",
    "- 최소값은 유저가 작성한 기준, 최대값은 더 도전적인 수준으로 제안",
    "- 최대값은 최소값보다 커야 한다",
    "- 단위는 목표에 맞게 자유롭게 (kg, 시간, 달러 등도 가능)",
    "",
    `사용자 목표: "${inputText}"`,
    "",
    "출력:",
    '{"title":"10자 이내 명사형","emoji":"이모지 1개","category":"카테고리","min_value":"최소 수치","max_value":"최대 수치","reason":"분석 근거 한 줄"}',
  ];
  return lines.join("\n");
};

export const analyzeGoalWithGemini = async (inputText) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  console.log("Gemini 호출 시작, 키 앞 10자:", apiKey.slice(0, 10));

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(inputText) }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1000 },
    }),
  });

  console.log("Gemini 응답 상태:", response.status);

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini 에러 응답:", errText);
    throw new Error(`Gemini API ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  console.log("Gemini 응답 데이터:", data);

  // parts가 여러 개로 분할될 수 있어서 전부 합쳐야 함
  const parts = data.candidates?.[0]?.content?.parts || [];
  const raw = parts.map((p) => p.text || "").join("");

  if (!raw) throw new Error("응답 텍스트 없음: " + JSON.stringify(data));

  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  const startIdx = cleaned.indexOf("{");
  const endIdx = cleaned.lastIndexOf("}");

  if (startIdx === -1)
    throw new Error("JSON 시작 없음: " + cleaned.slice(0, 100));
  if (endIdx === -1) throw new Error("JSON 끝 없음: " + cleaned.slice(0, 100));

  const parsed = JSON.parse(cleaned.slice(startIdx, endIdx + 1));
  return normalizeResult(parsed, inputText);
};
