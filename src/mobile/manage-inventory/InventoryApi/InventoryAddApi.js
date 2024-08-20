import axios from 'axios';
import { Product } from './InventoryModels'; 

// 제품을 인벤토리에 추가하는 함수
export const addProductToInventory = async (inventoryId, productData) => {
  try {
    const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI0MTMzNDU5LCJleHAiOjE3MjQxNDA2NTl9.ehZGIr_iWFe-_8dwSN6ksbrDiBWvhmlBIS2Gsx4hJ70";
    //const accessToken = localStorage.getItem("accessToken");


    // productData에서 productId 제거
    const { productId, ...dataWithoutProductId } = productData;

    const response = await axios.post(`https://api.yellobook.site/api/v1/inventories/${inventoryId}`, dataWithoutProductId, {
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