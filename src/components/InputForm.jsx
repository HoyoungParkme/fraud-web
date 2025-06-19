import React, { useState } from "react";

export default function InputForm({ onResult, setLoading }) {
  const [formData, setFormData] = useState({
    gender: "Male",
    marital_status: "Married",
    high_education_ind: 0,
    address_change_ind: "Changed",
    living_status: "Own",
    accident_site: "Local",
    past_num_of_claims: 0,
    witness_present_ind: "No witness",
    liab_prct: 42,
    channel: "Broker",
    policy_report_filed_ind: 1,
    claim_est_payout: 2748.61,
    age_of_vehicle: 8,
    vehicle_category: "Compact",
    vehicle_price: 19799.63,
    vehicle_color: "black",
    age_of_driver: 33,
    safty_rating: 34,
    annual_income: 35113.78,
    vehicle_weight: 11640.45,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setLoading) setLoading(true);

    try {
      const res = await fetch("https://fraud-api-m8dd.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("백엔드 응답:", result);

      if (!res.ok || result.probability === undefined || isNaN(result.probability)) {
        throw new Error("예측값이 유효하지 않음");
      }

      onResult(result); // 결과 전달
    } catch (err) {
      alert("예측 중 오류 발생: " + err.message);
      onResult(null);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "gender", label: "성별", options: ["Female", "Male"] },
          { name: "marital_status", label: "결혼 여부", options: ["Married", "Not married", "Unknown"] },
          { name: "address_change_ind", label: "주소 변경 여부", options: ["Changed", "Not changed"] },
          { name: "living_status", label: "거주 형태", options: ["Own", "Rent"] },
          { name: "accident_site", label: "사고 장소", options: ["Highway", "Local", "Parking Lot"] },
          { name: "witness_present_ind", label: "목격자 유무", options: ["No witness", "Unknown", "Witness"] },
          { name: "channel", label: "가입 경로", options: ["Broker", "Online", "Phone"] },
          { name: "vehicle_category", label: "차량 종류", options: ["Compact", "Large", "Medium"] },
          { name: "vehicle_color", label: "차량 색상", options: ["black", "blue", "gray", "other", "red", "silver", "white"] },
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>{`${label} 선택`}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <fieldset className="grid grid-cols-2 gap-4">
        {[
          ["age_of_driver", "운전자 나이", "예: 33"],
          ["safty_rating", "안전 등급", "예: 34"],
          ["annual_income", "연간 수입", "예: 35113.78"],
          ["vehicle_price", "차량 가격", "예: 19799.63"],
          ["vehicle_weight", "차량 무게", "예: 11640.45"],
          ["high_education_ind", "고등교육 여부 (0/1)", "예: 0"],
          ["past_num_of_claims", "과거 클레임 수", "예: 0"],
          ["liab_prct", "책임 비율 (%)", "예: 42"],
          ["policy_report_filed_ind", "정책 보고 여부 (0/1)", "예: 1"],
          ["claim_est_payout", "청구 예상 금액", "예: 2748.61"],
          ["age_of_vehicle", "차량 연식", "예: 8"],
        ].map(([name, label, placeholder]) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
      </fieldset>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        예측하기
      </button>
    </form>
  );
}
