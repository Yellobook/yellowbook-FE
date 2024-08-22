import { useEffect, useState } from "react";
import { getProfile } from "../../util/ProfileUtils";

export default function MobileMyPage() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        console.log(data); // 프로필 데이터를 콘솔에 출력합니다.
      } catch (error) {
        console.error("프로필을 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex py-5 items-center gap-5">
        <div
          className="size-[98px] rounded-full bg-orange bg-center bg-cover"
          style={{
            backgroundImage: `url("${profile.profileImage}")`,
          }}
        ></div>
        <div>
          <div className="text-orange text-[23px]">{profile.nickname}</div>
          <>
            {profile.teams
              ? profile.teams.map((t, ind) => (
                  <div
                    key={ind}
                    className="flex items-center justify-between text-[13px] opacity-50 gap-2"
                  >
                    <span>{t.teamName}</span>
                    <span>|</span>
                    <span>{t.role}</span>
                  </div>
                ))
              : null}
          </>
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
