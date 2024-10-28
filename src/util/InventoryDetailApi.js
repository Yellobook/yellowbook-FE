import axios from "axios";
import { Product } from "./InventoryModels"; // 모델을 불러옵니다

// 특정 인벤토리에 대한 제품 목록을 가져오는 함수
// 일별 재고 현황 상세 조회
export const fetchProductsByInventoryId = async (inventoryId) => {
  const accessToken = localStorage.getItem("accessToken");
  //localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/inventories/${inventoryId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data.isSuccess) {
      // products 데이터를 Product 모델에 맞춰 변환
      const products = response.data.data.products.map((item) => ({
        ...Product,
        ...item,
      }));
      return products;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
};
