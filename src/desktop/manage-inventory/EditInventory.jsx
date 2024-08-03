import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const DesktopEditInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParams = params.get("id");
    const dateParams = params.get("date");
    setDate(format(dateParams, "yyyy년 MM월 dd일"));
    setId(idParams);
  }, [location.search]);

  return (
    <div>
      <div className="mt-10 inline-block border-b" style={{ color: "#FFAB08" }}>
        {date} 재고현황
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/manage-inventory/edit/plus")}
          className="rounded px-3 py-1 mr-4 text-xs"
          style={{ backgroundColor: "#FFDE33" }}
        >
          + 제품 추가
        </button>
        <button
          className="rounded px-3 py-1 text-xs"
          style={{ backgroundColor: "#FFDE33" }}
        >
          - 제품 삭제
        </button>
      </div>

      <div className="flex items-center border mt-5 text-xs rounded-full px-4 border-yellow">
        <div className="mt-1">🔍</div>
        <input
          type="text"
          placeholder="제품이름, SKU 검색"
          className="flex-grow pl-2 focus:outline-none"
        />
      </div>
      <div
        style={{ color: "#97A5A4" }}
        className="border border-yellow rounded-xl text-center mt-10 p-10"
      >
        표
      </div>
    </div>
  );
};

export default DesktopEditInventory;
