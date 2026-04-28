import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import CategoryPicker from "./CategoryPicker";

export default function Step2Result({ result, setResult, onRegister }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setResult({ ...result, emoji });
    setShowEmojiPicker(false);
  };

  const handleCategorySelect = (category, emoji) => {
    setResult({ ...result, category, emoji });
    setShowCategoryPicker(false);
  };

  return (
    <div>
      <h1
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: 700,
          margin: "0 0 4px",
        }}
      >
        AI가 분석했어요
      </h1>
      <p style={{ color: "#666", fontSize: 14, margin: "0 0 24px" }}>
        수정이 필요하면 각 항목을 눌러 바꿔보세요
      </p>

      <div
        style={{
          background: "#1e1e1e",
          borderRadius: 20,
          padding: 20,
          marginBottom: 32,
        }}
      >
        {/* 목표 정보 (이모지 & 제목) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowCategoryPicker(false);
            }}
            style={{
              width: 56,
              height: 56,
              flexShrink: 0,
              background: "#2a2a2a",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              cursor: "pointer",
              border: showEmojiPicker
                ? "2px solid #666"
                : "2px solid transparent",
            }}
          >
            {result.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                background: "#2a2a2a",
                color: "#aaa",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 6,
                display: "inline-block",
                marginBottom: 6,
              }}
            >
              {result.category}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {editingTitle ? (
                <input
                  autoFocus
                  value={result.title}
                  onChange={(e) =>
                    setResult({ ...result, title: e.target.value })
                  }
                  onBlur={() => setEditingTitle(false)}
                  maxLength={20}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #555",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    outline: "none",
                    padding: "2px 0 2px",
                    fontFamily: "inherit",
                    minWidth: 0,
                  }}
                />
              ) : (
                <p
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    margin: 0,
                    flex: 1,
                    wordBreak: "keep-all",
                  }}
                >
                  {result.title}
                </p>
              )}
              <button
                onClick={() => setEditingTitle(!editingTitle)}
                style={{
                  background: "none",
                  border: "none",
                  flexShrink: 0,
                  color: "#555",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  padding: 0,
                }}
              >
                {editingTitle ? "완료" : "변경"}
              </button>
            </div>
          </div>
        </div>

        {/* 이모지 picker */}
        {showEmojiPicker && (
          <div style={{ background: "#2a2a2a", borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <EmojiPicker
              category={result.category}
              selectedEmoji={result.emoji}
              onSelect={handleEmojiSelect}
            />
          </div>
        )}

        {/* 카테고리 섹션 */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: "#666", fontSize: 12, margin: "0 0 6px" }}>
            카테고리
          </p>
          <button
            onClick={() => {
              setShowCategoryPicker(!showCategoryPicker);
              setShowEmojiPicker(false);
            }}
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "#2a2a2a",
              border: "1px solid #333",
              borderRadius: 12,
              color: "#fff",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "inherit",
            }}
          >
            <span>{result.category}</span>
            <span style={{ color: "#555", fontSize: 13 }}>변경</span>
          </button>
          {showCategoryPicker && (
            <CategoryPicker
              selectedCategory={result.category}
              onSelect={handleCategorySelect}
            />
          )}
        </div>

        {/* 목표 범위 섹션 및 안내 문구 */}
        <div>
          <p style={{ color: "#666", fontSize: 12, margin: "0 0 6px" }}>
            목표 범위 (최소 ~ 최대)
          </p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {["min_value", "max_value"].map((key, i) => (
              <React.Fragment key={key}>
                {i === 1 && (
                  <span key="sep" style={{ color: "#555", fontSize: 18 }}>
                    ~
                  </span>
                )}
                <div
                  key={key}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    setResult({ ...result, [key]: e.target.innerText.trim() })
                  }
                  style={{
                    flex: 1,
                    padding: 16,
                    background: "#2a2a2a",
                    border: "1px solid #333",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                    outline: "none",
                    cursor: "text",
                    minHeight: 52,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {result[key]}
                </div>
              </React.Fragment>
            ))}
          </div>
          <p
            style={{
              color: "#444",
              fontSize: 12,
              margin: "20px 0 0",
              textAlign: "center",
            }}
          >
            💡 최소 달성 시 100% 달성으로 인정돼요
          </p>
        </div>
      </div>

      {/* 등록 버튼 */}
      <button
        onClick={onRegister}
        style={{
          width: "100%",
          padding: 18,
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: 16,
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        이대로 등록하기
      </button>
    </div>
  );
}
