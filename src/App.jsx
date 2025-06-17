import React, { useState } from "react";
import InputForm from "./components/InputForm";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleResult = (data) => {
    if (data?.prediction === undefined || isNaN(data.prediction)) {
      setErrorMsg("예측값이 유효하지 않습니다.");
      setResult(null);
    } else {
      setResult(data);
      setErrorMsg("");
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">보험 사기 예측 서비스</h1>
      <InputForm onResult={handleResult} setLoading={setLoading} />
      {loading && <p className="mt-4 text-gray-600">예측 중입니다...</p>}
      {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}
      {result && (
        <div className="mt-4 p-4 border rounded shadow bg-white max-w-md mx-auto">
          <p className="font-bold mb-2">사기 확률: {(result.prediction * 100).toFixed(2)}%</p>
          <p className={`font-bold ${result.prediction > 0.5 ? "text-red-600" : "text-green-600"}`}>
            예측 결과: {result.prediction > 0.5 ? "사기 가능성 있음" : "정상"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
