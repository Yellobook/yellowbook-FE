import { useRecoilState, useSetRecoilState } from "recoil";
import { profile, teamBuild, teamIdState } from "../../atom";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "../../style/slider.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MakeTeam } from "../../util/TeamUtils";

export default function DesktopCreateTeam() {
  const [teamInfo, setTeamInfo] = useRecoilState(teamBuild);
  const setTeamId = useSetRecoilState(teamIdState);
  const [modeNum, setModeNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let tempInfo = teamInfo;
    let team = false;
    try {
      tempInfo = { ...tempInfo, name: e.target[0].value };
      if (e.target[2].checked) {
        tempInfo = { ...tempInfo, role: e.target[2].value };
      }
      if (e.target[3].checked) {
        tempInfo = { ...tempInfo, role: e.target[3].value };
      }
      if (e.target[4].checked) {
        tempInfo = { ...tempInfo, role: e.target[4].value };
      }
      tempInfo = {
        ...tempInfo,
        phoneNumber: e.target[6].value,
        address: e.target[7].value,
      };

      team = await MakeTeam(
        localStorage.getItem("accessToken"),
        tempInfo,
        setTeamId
      );
    } catch (error) {
      console.log(error);
      alert("정보를 확인해주세요");
    } finally {
      if (team.status) {
        navigate("/loading");
      } else {
        alert(
          `${team.errMessage} \n 문제가 반복되면 yellobook@admin.kr로 문의해주세요`
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="pageDesktopContainer">
      <div className="pageTitle">
        옐로우북과 함께 <br /> 간편한 주문과 재고 협업을 시작해보세요!
      </div>

      <form onSubmit={onSubmit} className="w-[510px] lg:w-[700px]">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper rounded-3xl border-2 border-yellow"
        >
          <SwiperSlide className="createTeamFormContainer">
            <div className="formCard">
              <div className="bg-yellow rounded-full px-7 py-1">
                협업 팀을 생성하시나요?
              </div>
              <div className="flex items-center justify-center w-full">
                <input
                  type="text"
                  placeholder="팀 공간의 이름을 입력해주세요."
                  required
                  className="outline-2 border-2 border-gray rounded-xl h-[100px] text-center w-[300px] placeholder:text-center px-2 focus:outline-yellow"
                />
              </div>
              <div className="text-gray">
                기존 협업 팀에 참여하시는 경우, 공유된 링크를 통해 시작해주세요!
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="createTeamFormContainer">
            <div className="formCard">
              <div className="text-xl">모드를 설정 해주세요</div>
              <div className="flex items-center justify-center w-full">
                <fieldset className="flex flex-col items-center text-center gap-5">
                  <label
                    htmlFor="mode1"
                    className={`mode ${modeNum === 1 ? "selectMode" : ""}`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="ADMIN"
                      className="hidden"
                      id="mode1"
                      onClick={() => setModeNum(1)}
                    />
                    관리자 모드
                  </label>
                  <label
                    htmlFor="mode2"
                    className={`mode ${modeNum === 2 ? "selectMode" : ""}`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="ORDER"
                      className="hidden"
                      id="mode2"
                      onClick={() => setModeNum(2)}
                    />
                    주문자 모드
                  </label>
                  <label
                    htmlFor="mode3"
                    className={`mode ${modeNum === 3 ? "selectMode" : ""}`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="VIEWER"
                      id="mode3"
                      className="hidden"
                      onClick={() => setModeNum(3)}
                    />
                    뷰어 모드
                  </label>
                </fieldset>
              </div>
              <div className="text-gray">
                기존 협업 팀에 참여하시는 경우, 공유된 링크를 통해 시작해주세요!
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="createTeamFormContainer">
            <div className="formCard">
              <div className="text-xl text-center">
                회사 또는 매장의
                <br /> 기본 정보를 입력해주세요
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col">
                  <label
                    htmlFor="companyName"
                    className="flex justify-between items-center"
                  >
                    회사/매장명
                    <input
                      type="text"
                      id="companyName"
                      className="companyInfoInput"
                      required
                    />
                  </label>

                  <label
                    htmlFor="companyNumber"
                    className="flex justify-between items-center"
                  >
                    회사/매장 전화번호
                    <input
                      type="text"
                      id="companyNumber"
                      className="companyInfoInput"
                      required
                    />
                  </label>

                  <label
                    htmlFor="companyAddress"
                    className="flex justify-between items-center"
                  >
                    회사/매장 주소
                    <input
                      type="text"
                      id="companyAddress"
                      className="companyInfoInput"
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="text-gray">
                추후 변경된 정보는 마이페이지 내 회사정보 수정을 이용해주세요.
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="createTeamFormContainer">
            <div className="formCard">
              <div className="text-xl text-center">
                팀 공간에서 사용할
                <br /> 사용자의 이름과 이메일을 적어주세요!
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border-2 border-yellow px-1 py-1 w-full focus:outline-none focus:border-orange"
                    placeholder="이름을 적어주세요"
                    required
                  />

                  <input
                    type="email"
                    className="border-2 border-yellow px-1 py-1 w-full focus:outline-none focus:border-orange"
                    placeholder="이메일을 적어주세요"
                    required
                  />
                </div>
              </div>
              {loading ? (
                <div className="bg-gray px-10 py-2 rounded-full ">
                  Loading...
                </div>
              ) : (
                <input
                  type="submit"
                  className="bg-yellow px-10 py-2 rounded-full hover:bg-opacity-65 transition cursor-pointer"
                  value="완료"
                />
              )}
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </div>
  );
}
