import axios from "axios";
// [관리자] 주문 정정 요청
const orderPatchCorr = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.patch(`https://api.yellobook.site/api/v1/orders/${orderId}/correction`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("[관리자] 주문 정정 요청:", error);
    throw error;
  }
};

export default orderPatchCorr;
