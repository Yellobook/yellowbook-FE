import React from "react";

const ExitTeam = () => {
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
        <select className="block w-full border border-yellow bg-white text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-yellow-500">
          <option value="" disabled style={{ color: "#d1d5db" }}>
            팀 이름 선택
          </option>
          <option value="team1">팀 이름 1</option>
          <option value="team2">팀 이름 2</option>
          <option value="team3">팀 이름 3</option>
        </select>
        <div className="flex flex-col justify-center items-center mt-48">
          <div className="text-xs mb-2" style={{ color: "#97A5A4" }}>
            팀 나가기 버튼을 누르면 스페이스에서 퇴장하게 됩니다.
          </div>
          <button
            className="w-full rounded py-2"
            style={{ backgroundColor: "#FFDE33" }}
          >
            팀 나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitTeam;
