import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import ReactCalendar from "../../components/calendar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUpComing } from "../../util/Schedule";
import { useRecoilState } from "recoil";
import { profile, upcomingSchedule } from "../../atom";
import axios from "axios";
import dayjs from "dayjs";
import IsSwitch from "../../components/IsSwitch";

export default function MobileHome() {
  const navigate = useNavigate("");
  const [upcoming, setUpComing] = useState({});
  const [team, setTeam] = useState([]);
  const [isSwitch, setIsSwitch] = useState(false);
  const [currTeam, setCurrTeam] = useState({});

  const date = new Date();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("teams", res.data.data.teams);
        setTeam(res.data.data.teams);
        handleSwitch(res.data.data.teams);
      })
      .catch((e) => {
        console.log(e);
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
        console.log(e);
        if (e.response.data.code === "TEAM-001") {
          navigate("/login/create-team");
        } else {
          navigate("/login");
        }
      });
  }, []);

  const handleSwitch = (team) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/teams/current`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const curr = team.filter((t) => t.teamId === res.data.data.teamId);
        console.log(curr[0]);
        setCurrTeam(curr[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div
          className="homeCard bg-opacity-15"
          onClick={() => {
            setIsSwitch((prev) => !prev);
            handleSwitch(team);
          }}
          onBlur={() => setIsSwitch(false)}
        >
          <div>
            <div>
              {team.length > 0 ? `${currTeam.teamName}` : "팀 정보가 없습니다."}
            </div>
            <div className="text-orange text-[12px]">
              {team.length > 0
                ? `${currTeam.role} 역할`
                : "팀 정보가 없습니다."}
            </div>
          </div>
          <div className="text-orange">
            <ChevronUpIcon className="text-xl size-7" />
            <ChevronDownIcon className="text-xl size-7" />
          </div>
        </div>
        {isSwitch ? <IsSwitch currTeam={currTeam} teamLists={team} /> : null}
      </div>

      <div
        className="homeCard bg-opacity-50"
        onClick={() => navigate("/manage-inventory")}
      >
        <div>
          <div className="font-extrabold text-lg">
            관리자가 게시한 재고 현황
          </div>
          <div className="font-thin text-[13px]">
            {dayjs(date).format("YYYY년 MM월 DD일")} 재고 현황
          </div>
        </div>
        <div className="text-orange text-[10px] h-full flex flex-col justify-end">
          더보기
        </div>
      </div>

      <div className="homeCard" onClick={() => navigate("/calendar")}>
        <div className="w-full">
          <div className="text-lg font-bold">{upcoming.scheduleTitle}</div>
          <div className="text-[15px] flex justify-start gap-3 ">
            {/* <span>5월 20일</span>
            <span>|</span>
            <span>제품B 20개에 관한 게시글</span> */}
          </div>
        </div>
      </div>

      <ReactCalendar />
    </div>
  );
}
