import { EXAMPLE_INPUTS } from "../constants/categories";

export default function Step1Input({
  inputText,
  setInputText,
  onAnalyze,
  isLoading,
  error,
}) {
  return (
    <div>
      <h1
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.3,
          margin: "0 0 6px",
        }}
      >
        올해 이루고 싶은
        <br />
        목표가 뭔가요?
      </h1>
      <p style={{ color: "#888", fontSize: 14, margin: "0 0 20px" }}>
        자유롭게 적어주세요. AI가 분석해줄게요.
      </p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="예) 올해는 꼭 마라톤을 완주하고 싶어. 매주 3번 이상 달리기 연습을 할 계획이야."
        style={{
          width: "100%",
          minHeight: 140,
          background: "#1e1e1e",
          border: "1px solid #333",
          borderRadius: 16,
          padding: 16,
          color: "#fff",
          fontSize: 15,
          lineHeight: 1.6,
          resize: "none",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
      <p style={{ color: "#555", fontSize: 13, margin: "8px 0 20px" }}>
        구체적일수록 더 잘 분석돼요
      </p>

      {/* 입력 예시 */}
      <div
        style={{
          background: "#1a1a1a",
          borderRadius: 14,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 10px" }}>
          입력 예시
        </p>
        {EXAMPLE_INPUTS.map((ex, i) => (
          <p
            key={i}
            onClick={() => setInputText(ex)}
            style={{
              color: "#666",
              fontSize: 14,
              margin: "6px 0",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#aaa")}
            onMouseLeave={(e) => (e.target.style.color = "#666")}
          >
            · {ex}
          </p>
        ))}
      </div>

      {error && (
        <p
          style={{
            color: "#ff4444",
            fontSize: 13,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={onAnalyze}
        disabled={!inputText.trim() || isLoading}
        style={{
          width: "100%",
          padding: 18,
          background: inputText.trim() && !isLoading ? "#fff" : "#2a2a2a",
          color: inputText.trim() && !isLoading ? "#000" : "#555",
          border: "none",
          borderRadius: 16,
          fontSize: 17,
          fontWeight: 700,
          cursor: inputText.trim() && !isLoading ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
          fontFamily: "inherit",
        }}
      >
        {isLoading ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                border: "2px solid #555",
                borderTop: "2px solid #aaa",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.8s linear infinite",
              }}
            />
            분석 중...
          </span>
        ) : (
          "AI로 분석하기 →"
        )}
      </button>
    </div>
  );
}
