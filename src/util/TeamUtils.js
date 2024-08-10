import axios from "axios";

export async function MakeTeam(act, makeTeamProps) {
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/teams`,
      {
        headers: { Authorization: `Bearer ${act}` },
      },
      makeTeamProps
    )
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((e) => console.log("여기가 에러! makeTeam!", e));
}
