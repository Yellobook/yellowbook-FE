import axios from "axios";
// 공지 작성
// data에는 title, memo, mentioned, date
const PostNotice = async (data) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://api.yellobook.site/api/v1/informs",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};

export default PostNotice;
