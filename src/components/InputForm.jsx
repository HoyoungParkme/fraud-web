import React, { useState } from "react";

export default function InputForm({ onResult }) {
  const [formData, setFormData] = useState({
    gender: "",
    marital_status: "",
    high_education_ind: 0,
    address_change_ind: "",
    living_status: "",
    accident_site: "",
    past_num_of_claims: 0,
    witness_present_ind: "",
    liab_prct: 0,
    channel: "",
    policy_report_filed_ind: 0,
    claim_est_payout: 0,
    age_of_vehicle: 0,
    vehicle_category: "",
    vehicle_color: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://fraud-api-m8dd.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const result = await res.json();
    onResult(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {/* Text-based select fields */}
      <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>성별 선택 (Male / Female)</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select name="marital_status" value={formData.marital_status} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>결혼 여부 선택 (Married / Single)</option>
        <option value="Married">Married</option>
        <option value="Single">Single</option>
      </select>

      <select name="address_change_ind" value={formData.address_change_ind} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>주소 변경 여부 (No Change / Changed)</option>
        <option value="No Change">No Change</option>
        <option value="Changed">Changed</option>
      </select>

      <select name="living_status" value={formData.living_status} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>거주 상태 (Own / Rent / Other)</option>
        <option value="Own">Own</option>
        <option value="Rent">Rent</option>
        <option value="Other">Other</option>
      </select>

      <select name="accident_site" value={formData.accident_site} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>사고 장소 (Local / Parking Lot / Street)</option>
        <option value="Local">Local</option>
        <option value="Parking Lot">Parking Lot</option>
        <option value="Street">Street</option>
      </select>

      <select name="witness_present_ind" value={formData.witness_present_ind} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>목격자 유무 (No witness / Yes)</option>
        <option value="No witness">No witness</option>
        <option value="Yes">Yes</option>
      </select>

      <select name="channel" value={formData.channel} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>채널 (Agent / Broker / Online / Phone)</option>
        <option value="Agent">Agent</option>
        <option value="Broker">Broker</option>
        <option value="Online">Online</option>
        <option value="Phone">Phone</option>
      </select>

      <select name="vehicle_category" value={formData.vehicle_category} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>차량 종류 (Compact / Medium / Large)</option>
        <option value="Compact">Compact</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      <select name="vehicle_color" value={formData.vehicle_color} onChange={handleChange} required className="w-full p-2 rounded">
        <option value="" disabled>차량 색상</option>
        <option value="black">black</option>
        <option value="white">white</option>
        <option value="gray">gray</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="silver">silver</option>
        <option value="other">other</option>
      </select>

      {/* 숫자 입력 필드 */}
      <input
        type="number"
        name="high_education_ind"
        value={formData.high_education_ind}
        onChange={handleChange}
        placeholder="고등교육 여부 (0 또는 1)"
        className="w-full p-2 rounded"
      />
      <input
        type="number"
        name="past_num_of_claims"
        value={formData.past_num_of_claims}
        onChange={handleChange}
        placeholder="과거 클레임 수 (예: 0)"
        className="w-full p-2 rounded"
      />
      <input
        type="number"
        name="liab_prct"
        value={formData.liab_prct}
        onChange={handleChange}
        placeholder="책임 비율 (0~100)"
        className="w-full p-2 rounded"
      />
      <input
        type="number"
        name="policy_report_filed_ind"
        value={formData.policy_report_filed_ind}
        onChange={handleChange}
        placeholder="정책 보고 여부 (0 또는 1)"
        className="w-full p-2 rounded"
      />
      <input
        type="number"
        name="claim_est_payout"
        value={formData.claim_est_payout}
        onChange={handleChange}
        placeholder="청구 예상 금액 (예: 2700)"
        className="w-full p-2 rounded"
      />
      <input
        type="number"
        name="age_of_vehicle"
        value={formData.age_of_vehicle}
        onChange={handleChange}
        placeholder="차량 연식 (예: 8)"
        className="w-full p-2 rounded"
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded mt-4">
        예측하기
      </button>
    </form>
  );
}
