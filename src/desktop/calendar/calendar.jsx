import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactCalendar from "../../components/calendar";
import EventLists from "../../components/eventLists";
import { useState } from "react";
import CalendarModal from "../../components/calendarModal";

export default function DestkopCalendar() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal ? <CalendarModal setIsModal={setIsModal} /> : null}

      <div className="flex flex-col items-center gap-5 z-30">
        <div className="w-full bg-yellow bg-opacity-50 py-4 px-5 rounded-xl gmarketBold">
          최신 재고 현황을 확인해보세요!
        </div>
        <div className="flex items-center h-10 border-2 rounded-md px-1 w-full border-yellow">
          <MagnifyingGlassIcon className="size-6 text-yellow" />
          <input
            type="text"
            name=""
            id=""
            className="w-full py-1 px-1 placeholder:gmarketLight focus:outline-none gmarketLight"
            placeholder="일정 키워드 검색"
          />
        </div>

        <div className="relative">
          <div
            className="bg-orange text-white shadow-md rounded-xl py-1 px-2 absolute top-5 right-6 hover:bg-opacity-50 cursor-pointer transition-colors"
            onClick={() => {
              setIsModal(true);
            }}
          >
            + 일정
          </div>
          <ReactCalendar />
        </div>

        <EventLists />
      </div>
    </>
  );
}
