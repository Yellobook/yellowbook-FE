import axios from 'axios';
import { Inventory, ApiResponse } from './InventoryModels'; // Inventory와 ApiResponse 가져오기


// API를 호출하여 재고 데이터를 받아오는 함수
export const fetchInventories = async (page = 1, size = 1) => {
        // 로컬에서 토큰 가져오기
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NCwiaWF0IjoxNzI0MTc3MDAzLCJleHAiOjE3MjQxODQyMDN9.2sosEJr1kTRTFOezkcgbogSOhtJRWb4JGxxDsiAa2ac";
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

    // 성공적으로 데이터를 받았는지 확인
    if (apiResponse.isSuccess) {
      // 각 인벤토리를 Inventory 형태로 매핑
      const inventories = apiResponse.data.inventories.map(item => ({
        ...Inventory, // Inventory 기본 구조를 복사
        ...item       // API로부터 받은 데이터를 덮어씀
      }));
      
      return inventories;
    } else {
      throw new Error(apiResponse.message);
    }
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error.message);
  }
};
