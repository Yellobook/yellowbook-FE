import axios from 'axios';

// 특정 제품을 삭제하는 함수
export const deleteProduct = async (productId) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(`https://api.yellobook.site/api/v1/inventories/products/${productId}`, {
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
