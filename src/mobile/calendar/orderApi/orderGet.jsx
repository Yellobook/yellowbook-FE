import axios from 'axios';
// [주문자, 관리자] 주문 조회
const orderGet = async (orderId) => {
  try {
    const response = await axios.get(`/api/v1/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('[주문자, 관리자] 주문 조회:', error);
    throw error;
  }
};

export default orderGet;