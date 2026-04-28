import { CATEGORIES, CATEGORY_EMOJIS } from "../constants/categories";

export default function CategoryPicker({ selectedCategory, onSelect }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid #2a2a2a",
        borderRadius: 12,
        marginTop: 6,
        overflow: "hidden",
      }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            const emojis = CATEGORY_EMOJIS[cat] || ["🎯"];
            const randomEmoji =
              emojis[Math.floor(Math.random() * emojis.length)];
            onSelect(cat, randomEmoji);
          }}
          style={{
            width: "100%",
            padding: "14px 16px",
            background: selectedCategory === cat ? "#2a2a2a" : "transparent",
            border: "none",
            borderBottom: "1px solid #222",
            color: selectedCategory === cat ? "#fff" : "#888",
            fontSize: 15,
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
