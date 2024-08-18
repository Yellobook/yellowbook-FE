import OrderContainer from "./order";
import ManageCheckOrder from "./manage-check-order";
import Modal from "../../components/modal.jsx";
import OrderCheckOrder from "./orderer-check-order.jsx";
import Notice from "../notice/notice.jsx";
import search from "../../assets/mobile/calendar/search.svg";
import ReactCalendar from "../../components/calendar";
import { useState } from "react";

export default function MobileCalendar() {
  // 일정 추가 모달
  const [isOpen, setIsOpen] = useState(false);

  // 일정 추가 버튼 핸들러
  const handleAdd = () => {
    setIsOpen(true);
  };

  // 일정 추가 버튼 필요 -> ReactCalendar 안에 생길거임
  // handleAdd를 props로 넘겨줘야 함
  
  return (
    <div className="flex flex-col gap-3">
      <div className="homeCard bg-yellow50">
        <div className="flex">최신 재고 현황을 확인해보세요!</div>
      </div>
      <div>
        <div className="flex border rounded-3xl border-yellow pl-3 gap-2">
          <img className="w-5" src={search} alt="돋보기 아이콘" />
          <input className="flex outline-none" placeholder="일정 키워드 검색" />
        </div>
      </div>
      <ReactCalendar />
      {isOpen & <OrderContainer/>}
    </div>
  );
}
