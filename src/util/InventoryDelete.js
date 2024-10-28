import axios from 'axios';

// 제품 삭제
export const deleteProduct = async (productId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/inventories/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.data.isSuccess) {
      return response.data.message;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error('Failed to delete product: ' + error.message);
  }
};
