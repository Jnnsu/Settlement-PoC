import { CATEGORY_EMOJIS } from "../constants/categories";

export default function EmojiPicker({ category, selectedEmoji, onSelect }) {
  const emojis = CATEGORY_EMOJIS[category] || [];

  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid #2a2a2a",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {emojis.map((em) => (
        <button
          key={em}
          onClick={() => onSelect(em)}
          style={{
            width: 44,
            height: 44,
            background: selectedEmoji === em ? "#333" : "transparent",
            border: "none",
            borderRadius: 10,
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          {em}
        </button>
      ))}
    </div>
  );
}
