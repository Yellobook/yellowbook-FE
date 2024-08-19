export default function MobileMyPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex py-5 items-center gap-5">
        <div className="size-[98px] rounded-full bg-orange"></div>
        <div>
          <div className="text-orange text-[23px]">username</div>
          <div className="flex items-center justify-between text-[13px] opacity-50">
            <span>role</span>
            <span>|</span>
            <span>team name</span>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b-[1px] border-orange text-orange gmarketBold text-2xl">
          협업 팀 관리
        </div>
        <div className="*:border-b-[1px] *:py-2 *:border-orange">
          <div>팀원 초대하기</div>
          <div>멤버 권한 설정</div>
          <div>협업 팀 나가기</div>
          <div>협업 팀 새로 생성</div>
        </div>
      </div>

      <div>
        <div className="border-b-[1px] border-orange text-orange gmarketBold text-2xl">
          이용 안내
        </div>
        <div className="*:border-b-[1px] *:py-2 *:border-orange">
          <div>문의하기</div>
          <div>서비스 이용 약관</div>
          <div>서비스 정보</div>
          <div>로그아웃</div>
          <div>회원 탈퇴</div>
        </div>
      </div>
    </div>
  );
}
