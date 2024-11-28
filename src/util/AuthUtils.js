import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const logoutUser = async () => {
  try {
    await axios.post(
      "https://api.yellobook.site/api/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("로그아웃 중 오류 발생", error);
  }
};
