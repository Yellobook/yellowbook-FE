import axios from "axios";

const PostComment = async (informId, content) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://api.yellobook.site/api/v1/informs/${informId}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export default PostComment;
