import axios from 'axios';
import { Inventory, ApiResponse } from './InventoryModels'; 

// API를 호출하여 재고 데이터를 받아오는 함수
export const fetchInventories = async (page = 1, size = 1) => {
        // 로컬에서 토큰 가져오기
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI0MjIzNjk5LCJleHAiOjE3MjQyMzA4OTl9.6wMiN77vVJd5UYVK9cmuU6hHWT0ybeFQjR8TmPVehcQ";
  //localStorage.getItem("accessToken");
  try {
    const response = await axios.get('https://api.yellobook.site/api/v1/inventories', {
      params: {
        page,
        size
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    // API 응답을 ApiResponse 형태로 받기
    const apiResponse = { ...ApiResponse, ...response.data };

    if (apiResponse.isSuccess) {
      // 각 인벤토리를 Inventory 형태로 매핑
      const inventories = apiResponse.data.inventories.map(item => ({
        ...Inventory, 
        ...item       
      }));
      
      return inventories;
    } else {
      throw new Error(apiResponse.message);
    }
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
};
