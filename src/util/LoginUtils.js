import axios from "axios";

export async function getCookies(tempToken) {
  console.log(tempToken);
  await axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/terms`,
      {
        token: tempToken,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((e) => console.log("여기가 에러!"));
}
