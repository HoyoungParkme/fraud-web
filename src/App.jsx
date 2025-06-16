import React, { useState } from "react";
import InputForm from "./components/InputForm";

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    console.log("예측 결과:", data);
    setResult(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">보험 사기 예측 서비스</h1>
      <InputForm onResult={handleResult} />
      {result && (
        <div className="mt-4">
          <p>사기 여부: {result.fraud === 1 ? "사기" : "정상"}</p>
          <p>사기 확률: {(result.fraud_prob * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
