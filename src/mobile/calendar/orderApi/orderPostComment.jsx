import axios from "axios";
// [주문자, 관리자] 주문에 댓글 달기
const orderPostComment = async (orderId, content) => {
  try {
    const response = await axios.post(`/api/v1/orders/${orderId}/comment`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 댓글 작성 실패:", error);
    throw error;
  }
};

export default orderPostComment;
