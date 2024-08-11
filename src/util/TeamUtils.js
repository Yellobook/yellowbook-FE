import axios from "axios";

export async function MakeTeam(act, makeTeamProps) {
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
      return true;
    })
    .catch((e) => {
      console.log("여기가 에러! makeTeam!", e);
      return false;
    });
  return ok;
}
