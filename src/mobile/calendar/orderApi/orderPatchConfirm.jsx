import axios from "axios";
// [관리자] 주문 확정
const orderPatchConfirm = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
  
    const response = await axios.patch(`https://api.yellobook.site/api/v1/orders/${orderId}/confirm`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("[관리자] 주문 확정:", error);
    throw error;
  }
};

export default orderPatchConfirm;
