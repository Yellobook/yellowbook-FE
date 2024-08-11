import axios from "axios";
// [관리자] 주문 확정
const orderPatchConfirm = async (orderId) => {
  try {
    const response = await axios.patch(`/api/v1/orders/${orderId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("[관리자] 주문 확정:", error);
    throw error;
  }
};

export default orderPatchConfirm;
