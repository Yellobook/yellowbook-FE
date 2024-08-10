import axios from "axios";

// export const getCookies = async (tempToken: string) => {
//   const [cookie, setCookie] = useCookies();
//   await axios
//     .post(
//       `${process.env.REACT_APP_BASE_URL}/api/v1/auth/terms`,
//       {
//         token: tempToken,
//       },
//       { withCredentials: true }
//     )
//     .then((res) => {
//       setCookie("accessToken", res.data.data.accessToken);
//       setCookie("refreshToken", res.data.data.refreshToken);
//       localStorage.setItem("accessToken", res.data.data.accessToken);
//     })
//     .catch((e) => console.log(e));
// };

export async function getCookies(tempToken) {
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