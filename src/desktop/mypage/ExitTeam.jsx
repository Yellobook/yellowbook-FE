import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { teamIdState } from "../../atom";
import { useRecoilValue } from "recoil";
import { getProfile } from "../../util/ProfileUtils";
import { leaveTeam } from "../../util/TeamUtils";

const ExitTeam = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const teamId = useRecoilValue(teamIdState);

  const accessToken = localStorage.getItem("accessToken");

  const handleSelectChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const profileData = await getProfile();
    setProfile(profileData);
  };

  const doExit = async (teamId) => {
    leaveTeam(teamId);
  };

  return (
    <div>
      <div
        style={{ color: "#FFAB08" }}
        className="inline-block mt-20 text-xl border-b"
      >
        협업 팀 나가기
      </div>
      <div className="mt-8">
        <label className="block mb-2 text-lg" style={{ color: "#FFAB08" }}>
          삭제하실 협업 팀 스페이스를 선택해 주세요
        </label>
        <select
          className="block w-full border border-yellow bg-white text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-yellow-500"
          value={selectedTeam}
          onChange={handleSelectChange}
        >
          <option value="" disabled style={{ color: "#d1d5db" }}>
            팀 이름 선택
          </option>
          {profile &&
            profile.teams &&
            profile.teams.map((team, index) => (
              <option key={index} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
        </select>
        <div className="flex flex-col justify-center items-center mt-48">
          <div className="text-xs mb-2" style={{ color: "#97A5A4" }}>
            팀 나가기 버튼을 누르면 스페이스에서 퇴장하게 됩니다.
          </div>
          <button
            className="w-full rounded py-2"
            style={{ backgroundColor: "#FFDE33" }}
            onClick={doExit}
          >
            팀 나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitTeam;
