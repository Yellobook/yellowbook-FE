import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../util/ProfileUtils";
import { leaveTeam } from "../../util/TeamUtils";

const ExitTeam = () => {
  const [selectedTeam, setSelectedTeam] = useState(""); // 선택한 팀 이름
  const [profile, setProfile] = useState(null); // 사용자 프로필 데이터
  const navigate = useNavigate();

  // 팀 선택 시 상태 업데이트
  const handleSelectChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 프로필 데이터 가져오기
  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
    }
  };

  // 선택한 팀 ID로 팀 나가기
  const doExit = async () => {
    if (!selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }

    // 선택한 팀 이름에 해당하는 팀 ID 찾기
    const team = profile.teams.find((t) => t.teamName === selectedTeam);

    if (!team) {
      alert("올바른 팀을 선택해주세요.");
      return;
    }

    try {
      await leaveTeam(team.teamId); // 팀 나가기 API 호출
      alert("팀에서 성공적으로 나갔습니다.");
      navigate("/"); // 필요한 경우 다른 페이지로 이동
    } catch (error) {
      console.error("팀 나가기 실패:", error);
      alert("팀 나가기에 실패했습니다.");
    }
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
          {profile?.teams?.map((team) => (
            <option key={team.teamId} value={team.teamName}>
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
