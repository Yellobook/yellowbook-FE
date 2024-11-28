import OrderContainer from "./order";
import ManageCheckOrder from "./manage-check-order";
import Modal from "../../components/modal.jsx";
import OrderCheckOrder from "./orderer-check-order.jsx";
import Notice from "../notice/notice.jsx";
import search from "../../assets/mobile/calendar/search.svg";
import ReactCalendar from "../../components/calendar";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CalendarModal from "../../components/calendarModal.jsx";
import { useRecoilValue } from "recoil";
import { defaultDate, defaultYear } from "../../atom.js";
import axios from "axios";
import IsSearch from "../../components/IsSearch.jsx";
import useDebounce from "../../util/hooks/useDebounce.js";

export default function MobileCalendar() {
  // 일정 추가 모달
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [typedText, setTypedText] = useState("");
  const currYear = useRecoilValue(defaultYear);
  const currMonth = useRecoilValue(defaultDate);
  let debouncedText = useDebounce(typedText);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(false); // 리렌더링 트리거 상태

  useEffect(() => {
    if (isSearch) {
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/schedule/search`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            year: currYear,
            month: currMonth + 1,
            keyword: debouncedText,
          },
        })
        .then((res) => {
          setSearchResult(res.data.data.schedules);
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [debouncedText]);

  const handleSearch = (e) => {
    setTypedText(e.target.value);
  };

  // 일정 추가 버튼 핸들러
  const handleAdd = () => {
    setIsOpen(true);
  };

  // 일정 추가 버튼 필요 -> ReactCalendar 안에 생길거임
  // handleAdd를 props로 넘겨줘야 함

  return (
    <>
      {isModal ? (
        <div className="relative z-50">
          <OrderContainer setIsModal={setIsModal} />
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="homeCard bg-yellow50">
          <div className="flex">최신 재고 현황을 확인해보세요!</div>
        </div>
        <div className="w-full relative">
          <div className="flex items-center h-10 border-2 rounded-md px-1 w-full border-yellow">
            <MagnifyingGlassIcon className="size-6 text-yellow" />
            <input
              type="text"
              name=""
              id=""
              className="w-full py-1 px-1 placeholder:gmarketLight focus:outline-none gmarketLight"
              placeholder="일정 키워드 검색"
              onChange={(e) => handleSearch(e)}
              onFocus={() => setIsSearch(true)}
              onBlur={() => setIsSearch(false)}
            />
          </div>
          {isSearch ? (
            <IsSearch searchResult={searchResult} isLoading={isLoading} />
          ) : null}
        </div>
        <div className="relative z-0">
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
        {isOpen & <OrderContainer />}
      </div>
    </>
  );
}
