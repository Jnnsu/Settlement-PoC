import {
  CATEGORIES,
  CATEGORY_EMOJIS,
  CATEGORY_KEYWORDS,
} from "../constants/categories";

export const normalizeCategory = (inputCategory, inputText) => {
  // 1순위: 정확 매칭
  if (CATEGORIES.includes(inputCategory)) return inputCategory;

  // 2순위: AI 결과 기반 키워드 매칭
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => inputCategory?.includes(k))) return cat;
  }

  // 3순위: 유저 입력 텍스트 기반 매칭 (AI 틀려도 여기서 복구)
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => inputText?.includes(k))) return cat;
  }

  return "기타";
};

export const normalizeResult = (parsed, inputText = "") => {
  const category = normalizeCategory(parsed.category, inputText);

  if (parsed.category !== category) {
    console.log("AI category corrected:", parsed.category, "→", category);
  }

  const validEmojis = CATEGORY_EMOJIS[category] || ["🎯"];
  let emoji = parsed.emoji || "";
  if (!validEmojis.includes(emoji)) emoji = validEmojis[0];

  return {
    ...parsed,
    category,
    emoji,
    min_value: parsed.min_value || "1회",
    max_value: parsed.max_value || "10회",
    title: (parsed.title || "목표").slice(0, 20),
  };
};
