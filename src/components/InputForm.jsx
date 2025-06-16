// src/components/InputForm.jsx

import { useState } from "react";
import axios from "axios";

export default function InputForm() {
  const [input, setInput] = useState(Array(28).fill(""));
  const [result, setResult] = useState(null);

  const handleChange = (i, value) => {
    const updated = [...input];
    updated[i] = value;
    setInput(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedInput = input.map((v, i) =>
      i >= 16 ? v === "true" : parseInt(v, 10)
    );

    try {
      const res = await axios.post("https://fraud-api-m8dd.onrender.com/predict", {
        features: parsedInput,
      });
      setResult(res.data);
    } catch (err) {
      alert("요청 중 오류 발생: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {input.map((v, i) => (
          <input
            key={i}
            placeholder={`입력 ${i + 1}`}
            value={v}
            onChange={(e) => handleChange(i, e.target.value)}
            required
          />
        ))}
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>예측하기</button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <p><strong>사기 확률:</strong> {(result.fraud_prob * 100).toFixed(2)}%</p>
          <p><strong>사기 여부:</strong> {result.fraud ? "사기" : "정상"}</p>
        </div>
      )}
    </form>
  );
}
