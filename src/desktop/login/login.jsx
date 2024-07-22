import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/navaer.svg";
import logo2 from "../../assets/logo2.png";

export default function DesktopLogin() {
  return (
    <div className="lg:px-96 px-24 py-7 flex flex-col justify-center items-center gap-5 lg:gap-10">
      <div className="gmarketBold text-orange text-[40px] tracking-widest">
        YELLOBOOK 에 오신 것을 환영합니다!
      </div>

      <div className="flex lg:flex-row flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-3 text-orange underline underline-offset-4 cursor-pointer">
          <img src={logo2} alt="logo3D" className="bg-white size-96" />
          <div>옐로우북 이용가이드 바로가기</div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5">
          <div className="gmarketLight text-gray tracking-widest text-[30px]">
            나를 관리하고 함께 소통하는 옐로우북,
          </div>
          <div className="text-[30px] text-orange tracking-widest">
            시작해볼까요?
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="text-[25px] flex items-center gap-3">
              <div className="w-32 border-[1px] h-0 border-neutral-300" />
              <div>간편로그인</div>
              <div className="w-32 border-[1px] h-0 border-neutral-300" />
            </div>
            <div className="flex gap-5 items-center justify-center rounded-xl bg-[#f6dd01] w-[200px] cursor-pointer hover:bg-opacity-65 transition">
              <img src={kakao} alt="kakao" className="size-12" />
              <span>카카오 로그인</span>
            </div>
            <div className="flex gap-5 items-center justify-center rounded-xl bg-[#03c63c] w-[200px] h-12 cursor-pointer hover:bg-opacity-65 transition">
              <img src={naver} alt="naver" className="size-6" />
              <span className="text-white">네이버 로그인</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
