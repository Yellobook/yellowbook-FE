import axios from "axios";
// 주문 취소
const orderDelete = async (orderId) => {
  try {
    const response = await axios.delete(`/api/v1/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export default orderDelete;
