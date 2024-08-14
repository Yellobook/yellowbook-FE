import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import ReactCalendar from "../../components/calendar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { upcomingSchedule } from "../../atom";
import { getUpComing } from "../../util/Schedule";

export default function MobileHome() {
  const navigate = useNavigate("");
  const [upcoming, setUpComing] = useRecoilState(upcomingSchedule);
  useEffect(async () => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    const schedule = await getUpComing(localStorage.getItem("accessToken"));
    setUpComing(schedule);
    console.log(schedule);
  }, [upcoming]);
  return (
    <div className="flex flex-col gap-3">
      <div className="homeCard bg-opacity-15">
        <div>
          <div>팀 이름</div>
          <div className="text-orange text-[12px]">멤버 9</div>
        </div>
        <div className="text-orange">
          <ChevronUpIcon className="text-xl size-7" />
          <ChevronDownIcon className="text-xl size-7" />
        </div>
      </div>

      <div className="homeCard bg-opacity-50">
        <div>
          <div className="font-extrabold text-lg">
            관리자가 게시한 재고 현황
          </div>
          <div className="font-thin text-[13px]">
            2024년 05월 09일 재고 현황
          </div>
        </div>
        <div className="text-orange text-[10px] h-full flex flex-col justify-end">
          더보기
        </div>
      </div>

      <div className="homeCard">
        <div className="w-full">
          <div className="text-lg font-bold">{}</div>
          <div className="text-[15px] flex justify-between ">
            <span>5월 20일</span>
            <span>|</span>
            <span>제품B 20개에 관한 게시글</span>
          </div>
        </div>
      </div>

      <ReactCalendar />
    </div>
  );
}
