import axios from "axios";
// [주문자, 관리자] 주문에 댓글 달기
const orderPostComment = async (orderId, content) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      `https://api.yellobook.site/api/v1/orders/${orderId}/comment`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 댓글 작성 실패:", error);
    throw error;
  }
};

export default orderPostComment;
