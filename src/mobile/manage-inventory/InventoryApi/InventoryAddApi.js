import axios from 'axios';

// 제품을 인벤토리에 추가하는 함수
export const addProductToInventory = async (inventoryId, productData) => {
  try {
    console.log('inventoryId:', inventoryId);

    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI0MjIzNjk5LCJleHAiOjE3MjQyMzA4OTl9.6wMiN77vVJd5UYVK9cmuU6hHWT0ybeFQjR8TmPVehcQ";
    const response = await axios.post(`https://api.yellobook.site/api/v1/inventories/${inventoryId}`, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.isSuccess) {
      return response.data.data; // 응답 데이터의 productId 반환
    } else {
      throw new Error(response.data.message || 'Failed to add product');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred while adding the product');
  }
};
