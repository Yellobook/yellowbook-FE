import React, { useState } from "react";
import ReactCalendar from "../../components/calendar"; // ReactCalendar 컴포넌트 import

export default function DesktopCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <div className="flex flex-col gap-3">
      <div className="homeCard bg-[#FFEE98] text-left text-[25px] font-bold">
        최신 재고 현황을 확인해보세요!
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="일정 키워드 검색"
          className="w-full p-2 pl-8 border border-[#FFEE98] rounded-lg"
        />
        <svg
          className="w-4 h-4 absolute left-2 top-3 text-[#FFEE98]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <ReactCalendar />
    </div>
  );
}
