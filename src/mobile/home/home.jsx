import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import ReactCalendar from "../../components/calendar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { upcomingSchedule } from "../../atom";
import { getUpComing } from "../../util/Schedule";
import axios from "axios";
import { api } from "../../util/Axios_Interceptor";

export default function MobileHome() {
  const navigate = useNavigate("");
  const [upcoming, setUpComing] = useState({});
  const [team, setTeam] = useState([]);
  useEffect(() => {
    if (
      !localStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken") === undefined
    ) {
      navigate("/login");
    } else {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setTeam(res.data.data.teams);
        })
        .catch((e) => {
          navigate("/login");
        });

      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/schedule/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          setUpComing(res.data.data);
        })
        .catch((e) => {
          if (e.response.data.code === "TEAM-001") {
            navigate("/login/create-team");
          } else {
            navigate("/login");
          }
        });
    }
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="homeCard bg-opacity-15">
        <div>
          <div>{team.length > 0 ? team[0].teamName : "정보가 없습니다."}</div>
          <div className="text-orange text-[12px]">
            {team.length > 0 ? `${team[0].role} 모드` : "정보가 없습니다."}
          </div>
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
          <div className="text-lg font-bold">{upcoming.scheduleTitle}</div>
          {/* <div className="text-[15px] flex justify-between ">
            <span>5월 20일</span>
            <span>|</span>
            <span>제품B 20개에 관한 게시글</span>
          </div> */}
        </div>
      </div>

      <ReactCalendar />
    </div>
  );
}
