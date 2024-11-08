import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactCalendar from "../../components/calendar";
import EventLists from "../../components/eventLists";
import { useEffect, useState } from "react";
import CalendarModal from "../../components/calendarModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultDate, defaultYear } from "../../atom";
import axios from "axios";
import useDebounce from "../../util/hooks/useDebounce";
import { debounce } from "lodash";
import IsSearch from "../../components/IsSearch";

export default function DestkopCalendar() {
  const [isModal, setIsModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [typedText, setTypedText] = useState("");
  const currYear = useRecoilValue(defaultYear);
  const currMonth = useRecoilValue(defaultDate);
  let debouncedText = useDebounce(typedText);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isModal ? <CalendarModal setIsModal={setIsModal} /> : null}

      <div className="flex flex-col items-center gap-5 z-30">
        <div className="w-full bg-yellow bg-opacity-50 py-4 px-5 rounded-xl gmarketBold">
          최신 재고 현황을 확인해보세요!
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

        <div className="relative z-40">
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
