import axios from 'axios';
// [관리자] 주문 정정 요청
const orderPatchCorr = async (orderId) => {
  try {
    const response = await axios.patch(`/api/v1/orders/${orderId}/correction`);
    return response.data;
  } catch (error) {
    console.error('[관리자] 주문 정정 요청:', error);
    throw error;
  }
};

export default orderPatchCorr;