import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Logo from "../../assets/mobile/calendar/logo.png";
import { useRecoilValue } from "recoil";
import { teamIdState } from "../../atom";
import { getProfile } from "../../util/ProfileUtils";
import { deleteUser, logoutUser } from "../../util/AuthUtils";
import { inviteTeam } from "../../util/TeamUtils";

const MyPage = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const teamId = useRecoilValue(teamIdState);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const profileData = await getProfile();
    setProfile(profileData);
  };

  const deactivateUser = async () => {
    await deleteUser();
  };

  const logout = async () => {
    await logoutUser(teamId);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeLogoutModal();
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deactivateUser();
    closeDeleteModal();
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
        <div
          onClick={openDeleteModal}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          회원 탈퇴
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
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-red rounded"
          >
            로그아웃
          </button>
        </div>
      </Modal>
      {/* 회원 탈퇴 달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white rounded-sm w-72 text-center"
      >
        <div
          onClick={closeDeleteModal}
          className="cursor-pointer flex text-gray justify-end mr-2"
        >
          x
        </div>
        <h2>회원 탈퇴 하시겠습니까 ?</h2>
        <div style={{ color: "#828282" }} className="p-3 text-xs">
          회원 탈퇴시 계정 정보가 삭제되어 <br /> 복구가 불가능합니다.
        </div>
        <div>정말로 탈퇴하시겠습니까?</div>
        <div className="border-t flex pl-4 pr-4 justify-between mt-4">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-200 text-blue-500 rounded"
          >
            돌아가기
          </button>
          <button onClick={handleDelete} className="px-4 py-2 text-red rounded">
            회원 탈퇴
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
