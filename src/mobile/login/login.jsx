import { Link } from "react-router-dom";
import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/navaer.svg";
import logo2 from "../../assets/logo2.png";

export default function MobileLogin() {
  return (
    <div className="px-10 flex flex-col justify-start py-4 items-center gap-5">
      <div className="gmarketBold text-orange text-[23px] tracking-widest text-center">
        YELLOBOOK에 오신 것을 환영합니다!
      </div>
      <div className="text-gray gmarketLight text-[15px] tracking-widest">
        나를 관리하고 함께 소통하는 옐로우북,
      </div>
      <div className="gmarketLight text-[23px] tracking-widest">
        시작해볼까요?
      </div>

      <div className="flex flex-col justfiy-center items-center">
        <img src={logo2} alt="logo2" className="w-[200px]" />
        <div className="text-orange underline-offset-2 underline">
          옐로우북 이용가이드 바로가기
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[15px] flex items-center gap-3">
          <div className="w-24 border-[1px] h-0 border-neutral-300" />
          <div>간편로그인</div>
          <div className="w-24 border-[1px] h-0 border-neutral-300" />
        </div>
        <Link
          to="https://api.yellobook.site/oauth2/authorization/kakao"
          className="gap-5 grid grid-cols-[1fr_4fr] px-8 rounded-xl bg-[#f6dd01] w-full cursor-pointer hover:bg-opacity-65 transition"
        >
          <img src={kakao} alt="kakao" className="size-12" />
          <span className="flex items-center">카카오 로그인</span>
        </Link>
        <div className="grid grid-cols-[1fr_4fr] gap-5 h-[48px] px-8 rounded-xl bg-[#03c63c] w-full cursor-pointer hover:bg-opacity-65 transition">
          <div className="flex items-center">
            <img src={naver} alt="naver" className="size-6 flex items-center" />
          </div>
          <span className="text-white flex items-center">네이버 로그인</span>
        </div>
      </div>
    </div>
  );
}
