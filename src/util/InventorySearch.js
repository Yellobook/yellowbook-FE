import axios from 'axios';

// 재고 검색
export const searchProducts = async (inventoryId, keyword) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(`https://api.yellobook.site/api/v1/inventories/${inventoryId}/search`, {
      params: { keyword: keyword },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (response.data.isSuccess) {
      return response.data.data.products;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error('Failed to search products: ' + error.message);
  }
};
