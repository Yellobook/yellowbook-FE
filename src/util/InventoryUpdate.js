import axios from 'axios';

// 제품 수량 수정
export const updateProductAmount = async (productId, amount) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/inventories/products/${productId}`, {
      amount: amount
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error('Failed to update product amount: ' + error.message);
  }
};
