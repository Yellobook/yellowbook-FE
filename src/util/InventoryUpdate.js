import axios from 'axios';

// 특정 제품의 수량을 수정하는 함수
export const updateProductAmount = async (productId, amount) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.put(`https://api.yellobook.site/api/v1/inventories/products/${productId}`, {
      amount: amount
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.data.isSuccess) {
      return response.data.data; // 업데이트된 제품 데이터를 반환
    } else {
      throw new Error(response.data.message); // API 응답에 문제가 있을 경우 예외 처리
    }
  } catch (error) {
    throw new Error('Failed to update product amount: ' + error.message);
  }
};
