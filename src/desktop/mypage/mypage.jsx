import React from "react";
import Logo from "../../assets/mobile/calendar/logo.png"; // Ensure the path is correct

const MyPage = () => {
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
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
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
          style={{ color: "#697675", borderColor: "#FFAB08" }}
          className="border-b flex items-center p-2"
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
    </div>
  );
};

export default MyPage;
