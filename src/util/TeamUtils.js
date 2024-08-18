import axios from "axios";
import { teamIdState } from '../atom';
import { useSetRecoilState } from 'recoil';

export async function MakeTeam(act, makeTeamProps, setTeamId) {
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
      setTeamId(teamId);

      return { status: true, errMessage: "" };
    })
    .catch((e) => {
      console.log("여기가 에러! makeTeam!", e);
      return { status: false, errMessage: e.response.data.message };
    });
  return ok;
}
