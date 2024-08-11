import axios from 'axios';
// [주문자] 주문 작성
const orderWrite = async (productId, memo, date, orderAmount) => {
  try {
    const response = await axios.post(`/api/v1/orders`, {
      productId,
      memo,
      date,
      orderAmount,
    });
    return response.data;
  } catch (error) {
    console.error('[주문자] 주문 작성 실패:', error);
    throw error;
  }
};

export default orderWrite;