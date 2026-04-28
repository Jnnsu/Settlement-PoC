import { useState } from "react";
import { analyzeGoalWithGemini } from "./api/gemini";
import { normalizeResult } from "./utils/normalize";
import Step1Input from "./components/Step1Input";
import Step2Result from "./components/Step2Result";

export default function App() {
  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const analyzed = await analyzeGoalWithGemini(inputText);
      setResult(analyzed);
      setStep(2);
    } catch (e) {
      console.error("Goal analysis error:", e);
      // fallback — AI 실패해도 2페이지로 이동
      setResult(
        normalizeResult(
          {
            title: inputText.slice(0, 15),
            category: "",
            min_value: "1회",
            max_value: "10회",
            reason: "AI 분석 실패 - 직접 수정해주세요",
          },
          inputText
        )
      );
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    if (!result) return;
    alert(
      `등록 완료!\n\n목표: ${result.title}\n카테고리: ${result.category}\n범위: ${result.min_value} ~ ${result.max_value}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        padding: 20,
      }}
    >
      {/* 폰 프레임 */}
      <div
        style={{
          width: 390,
          minHeight: 844,
          background: "#111",
          borderRadius: 44,
          overflow: "hidden",
          boxShadow: "0 0 0 1px #2a2a2a, 0 40px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* 상태바 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "14px 24px 0",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <span style={{ fontSize: 13 }}>•••</span>
        </div>

        {/* 헤더 */}
        <div
          style={{
            padding: "12px 20px 0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => step === 2 && setStep(1)}
            style={{
              width: 36,
              height: 36,
              background: "#2a2a2a",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ◀
          </button>
          <span style={{ color: "#fff", fontSize: 17, fontWeight: 600 }}>
            목표 등록
          </span>
        </div>

        {/* 프로그레스 바 */}
        <div style={{ padding: "12px 20px 0", display: "flex", gap: 6 }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                background: step >= i ? "#fff" : "#333",
                borderRadius: 2,
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* 컨텐츠 */}
        <div style={{ padding: "28px 20px 20px" }}>
          {step === 1 && (
            <Step1Input
              inputText={inputText}
              setInputText={setInputText}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
            />
          )}
          {step === 2 && result && (
            <Step2Result
              result={result}
              setResult={setResult}
              onRegister={handleRegister}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        textarea::placeholder { color: #444; }
        input::placeholder { color: #444; }
      `}</style>
    </div>
  );
}
