import axios from "axios";
import { teamIdState } from '../atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

const accessToken = localStorage.getItem('accessToken');

export async function MakeTeam(act, makeTeamProps, setTeamId) { // setTeamId를 인자로 받아옴
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
      setTeamId(teamId);  // 전달된 setTeamId를 사용하여 teamIdState를 업데이트

      return { status: true, errMessage: "" };
    })
    .catch((e) => {
      console.log("여기가 에러! makeTeam!", e);
      return { status: false, errMessage: e.response.data.message };
    });

  return ok;
}

export const leaveTeam = async (teamId) => {
  if (!teamId) {
    console.error("Team ID가 없습니다.");
    return;
  }

  try {
    const leaveTeam_res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/v1/teams/${teamId}/leave`,{
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    alert("협업 팀에서 성공적으로 나가졌습니다.");
    console.log("협업 팀에서 성공적으로 나가졌습니다.", leaveTeam_res.data);
  } catch (e) {
    console.error("팀 나가기 요청 중 오류 발생:", e);
    alert("팀 나가기 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
};

