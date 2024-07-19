import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Logo from "../../assets/mobile/calendar/logo.png";

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // 로그아웃 로직 추가
    closeModal();
  };

  return (
    <div>
      <div className="flex justify-center space-x-12 items-center mt-4">
        <img src={Logo} alt="Logo" className="border w-32 h-32 rounded-full" />
        <div className="space-y-2">
          <div className="text-xl" style={{ color: "#FFAB08" }}>
            nickName
          </div>
          <div style={{ color: "#697675" }}>관리자 | 딸기네 딸기농장</div>
          <div style={{ color: "#697675" }}>주문자 | 피그마 플라스틱 공장</div>
        </div>
      </div>
      <div className="mt-20">
        <div
          style={{ color: "#FFAB08" }}
          className="border-b text-xl flex items-center p-2"
        >
          협업 팀 관리
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          팀원 초대하기
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
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
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          협업 팀 새로 생성
        </div>
      </div>
      <div className="mt-20">
        <div
          style={{ color: "#FFAB08" }}
          className="border-b text-xl flex items-center p-2"
        >
          이용 안내
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          문의하기
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          서비스 이용 약관
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          서비스 정보
        </div>
        <div
          onClick={openModal}
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="cursor-pointer border-b flex items-center p-2"
        >
          로그아웃
        </div>
        <div
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
        >
          회원 탈퇴
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white rounded-lg w-72 text-center"
      >
        <div
          onClick={closeModal}
          className="cursor-pointer flex justify-end mr-2"
        >
          x
        </div>
        <h2>로그아웃 하시겠습니까 ?</h2>
        <div className="border-t flex pl-4 pr-4 justify-between mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-blue-500 rounded"
          >
            돌아가기
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-red-500 rounded"
          >
            로그아웃
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
