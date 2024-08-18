import axios from "axios";

// 공지 삭제
const DeleteNotice = async (informId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://api.yellobook.site/api/v1/informs/${informId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

export default DeleteNotice;
