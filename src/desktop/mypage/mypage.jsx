import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Logo from "../../assets/mobile/calendar/logo.png";
import { getProfile, getTeam } from "../../util/ProfileUtils";
import { logoutUser } from "../../util/AuthUtils";
import { inviteTeam } from "../../util/TeamUtils";

const MyPage = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("VIEWER"); // 초대 역할 기본값
  const [inviteUrl, setInviteUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  // 프로필 조회
  const fetchProfile = async () => {
    const profileData = await getProfile();
    setProfile(profileData);
    const currentTeam = await getTeam();
    setTeamId(currentTeam?.teamId);
  };

  // 팀원 초대하기
  const handleInviteClick = async () => {
    const url = await inviteTeam(teamId, selectedRole);
    if (url) {
      setInviteUrl(url);
    }
  };

  // 팀원 초대 모달 열기
  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  // 팀원 초대 모달 닫기
  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  // 로그아웃
  const logout = async () => {
    await logoutUser();
    closeLogoutModal();
    window.location.href = "/";
  };

  // 로그아웃 모달 열기
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // 로그아웃 모달 닫기
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center space-x-12 items-center mt-4">
        <img
          src={profile ? profile.profileImage : Logo}
          alt="profileImage"
          className="border w-32 h-32 rounded-full"
        />
        <div className="space-y-2">
          <div className="text-xl" style={{ color: "#FFAB08" }}>
            {profile ? profile.nickname : "로딩 중..."}
          </div>
          {profile?.teams.map((team, index) => (
            <div key={team.id || index} style={{ color: "#697675" }}>
              {team.role} | {team.teamName}{" "}
            </div>
          ))}
        </div>
      </div>
      {/*협업 팀 관리*/}
      <div className="mt-10">
        <div
          style={{ color: "#FFAB08" }}
          className="border-b text-xl flex items-center p-2"
        >
          협업 팀 관리
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
          onClick={openInviteModal}
        >
          팀원 초대하기
        </div>
        <div
          onClick={() => alert("준비 중 입니다.")}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          멤버 권한 설정
        </div>
        <div
          onClick={() => navigate("/exitTeam")}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          협업 팀 나가기
        </div>
        <div
          onClick={() => navigate("/login/create-team")}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          협업 팀 새로 생성
        </div>
      </div>
      {/*이용 안내*/}
      <div className="mt-10">
        <div
          style={{ color: "#FFAB08" }}
          className="cursor-pointer border-b text-xl flex items-center p-2"
        >
          이용 안내
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
          onClick={() => window.open("https://forms.gle/orAjV62f3jdMWg9a9")}
        >
          문의하기
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          서비스 이용 약관
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          서비스 정보
        </div>
        <div
          onClick={openLogoutModal}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          로그아웃
        </div>
      </div>
      {/* 로그아웃 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={closeLogoutModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white rounded-sm w-72 text-center"
      >
        <div
          onClick={closeLogoutModal}
          className="cursor-pointer flex justify-end mr-2 text-gray"
        >
          x
        </div>
        <h2 className="py-6">로그아웃 하시겠습니까 ?</h2>
        <div className="border-t flex pl-4 pr-4 justify-between mt-4">
          <button
            onClick={closeLogoutModal}
            className="px-4 py-2 bg-gray-200 text-blue-500 rounded"
          >
            돌아가기
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 text-red rounded"
          >
            로그아웃
          </button>
        </div>
      </Modal>
      {/* 팀원 초대 모달 */}
      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={closeInviteModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white rounded-sm w-72 text-center"
      >
        <div
          onClick={closeInviteModal}
          className="cursor-pointer flex justify-end mr-2 text-gray"
        >
          x
        </div>
        <h2 className="py-6">초대할 팀원의 역할을 선택하세요</h2>
        <div className="py-4 px-4">
          <label
            htmlFor="role-select"
            className="block mb-2 text-sm text-gray-700"
          >
            역할 선택
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="VIEWER">뷰어</option>
            <option value="ORDERER">주문자</option>
            <option value="ADMIN">관리자</option>
          </select>
          {inviteUrl && (
            <div className="mt-4 text-sm text-blue-600 break-all">
              초대 링크:{" "}
              <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                {inviteUrl}
              </a>
            </div>
          )}
        </div>

        <div className="border-t flex pl-4 pr-4 justify-between mt-4">
          <button
            onClick={closeInviteModal}
            className="px-4 py-2 bg-gray-200 text-blue-500 rounded"
          >
            돌아가기
          </button>
          <button
            onClick={handleInviteClick}
            className="px-4 py-2 bg-gray-200 text-red rounded"
          >
            팀원 초대
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
