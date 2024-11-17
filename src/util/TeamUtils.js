import axios from "axios";
import { teamIdState } from "../atom";
import { useSetRecoilState, useRecoilValue } from "recoil";

const accessToken = localStorage.getItem("accessToken");

export async function MakeTeam(act, makeTeamProps, setTeamId) {
  // setTeamId를 인자로 받아옴
  const ok = await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/teams`,
      {
        name: makeTeamProps.name,
        phoneNumber: makeTeamProps.phoneNumber,
        address: makeTeamProps.address,
        role: makeTeamProps.role,
      },
      {
        headers: { Authorization: `Bearer ${act}` },
      }
    )
    .then((res) => {
      const teamId = res.data.data.teamId;
      setTeamId(teamId); // 전달된 setTeamId를 사용하여 teamIdState를 업데이트

      return { status: true, errMessage: "" };
    })
    .catch((e) => {
      console.log("여기가 에러! makeTeam!", e);
      return { status: false, errMessage: e.response.data.message };
    });

  return ok;
}

// 팀 초대
export const inviteTeam = async (teamId) => {
  try {
    const inviteTeam_res = await axios.post(
      `https://api.yellobook.site/api/v1/teams/${teamId}/invite`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return inviteTeam_res.data.data.inviteUrl;
  } catch (e) {
    console.error("팀 초대 중 오류 발생");
  }
};

// 팀 전환
export const getTeamInfo = async (teamId) => {
  try {
    const teamInfo_res = await axios.get(
      `https://api.yellobook.site/api/v1/teams/${teamId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return teamInfo_res.data.data;
  } catch (e) {
    console.error("팀 전환 중 오류 발생");
  }
};

// 팀 내의 모든 멤버 조회
export const getMembers = async () => {
  try {
    //const accessToken = process.env.REACT_APP_ADMIN_TOKEN;
    console.log("accessToken: ", accessToken);
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/teams/members`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("팀 내의 모든 멤버 조회 중 오류 발생:", error);
    return [];
  }
};

// 팀 내의 멤버 검색
export const memberSearch = async (name) => {
  try {
    const memberSearch_res = await axios.get(
      `https://api.yellobook.site/api/v1/teams/members/search`,
      {
        params: {
          name: name,
        },
      }
    );
    return memberSearch_res.data.ids;
  } catch (error) {
    console.error("팀 내의 멤버 검색 중 오류 발생", error);
  }
};

// 팀 참가
export const joinTeam = async (code) => {
  try {
    const joinTeam_res = await axios.get(
      `https://api.yellobook.site/api/v1/teams/invitation`,
      {
        params: {
          code: code,
        },
      }
    );
    return joinTeam_res.data.data;
  } catch (error) {
    console.error("팀 참가 중 오류 발생");
  }
};

// 팀 나가기
export const leaveTeam = async (teamId) => {
  if (!teamId) {
    console.error("Team ID가 없습니다.");
    return;
  }

  try {
    const leaveTeam_res = await axios.delete(
      `https://api.yellobook.site/api/v1/teams/${teamId}/leave`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    alert("협업 팀에서 성공적으로 나가졌습니다.");
    console.log("협업 팀에서 성공적으로 나가졌습니다.", leaveTeam_res.data);
  } catch (e) {
    console.error("팀 나가기 요청 중 오류 발생:", e);
    alert("팀 나가기 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
};
