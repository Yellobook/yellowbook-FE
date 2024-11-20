import axios from "axios";
import { Inventory, ApiResponse } from "./InventoryModels";
import { Product } from "./InventoryModels"; // 모델을 불러옵니다

const accessToken = localStorage.getItem("accessToken");

// 제품을 인벤토리에 추가하는 함수
export const addProductToInventory = async (inventoryId, productData) => {
  try {
    console.log("inventoryId:", inventoryId);

    const response = await axios.post(
      `https://api.yellobook.site/api/v1/inventories/${inventoryId}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.isSuccess) {
      return response.data.data; // 응답 데이터의 productId 반환
    } else {
      throw new Error(response.data.message || "Failed to add product");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the product"
    );
  }
};

// 엑셀 파일 읽어서 재고 생성
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 파일 데이터 추가

  try {
    const response = await axios.post(
      `https://api.yellobook.site/api/v1/inventories`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // multipart 형식 명시
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("파일 업로드 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error;
  }
};

// 전체 재고 데이터를 받아오는 함수
export const fetchInventories = async (page = 1, size = 5) => {
  // 로컬에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");
  //localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories`,
      {
        params: {
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // API 응답을 ApiResponse 형태로 받기
    const apiResponse = { ...ApiResponse, ...response.data };

    if (apiResponse.isSuccess) {
      // 각 인벤토리를 Inventory 형태로 매핑
      const inventories = apiResponse.data.inventories.map((item) => ({
        ...Inventory,
        ...item,
      }));

      return inventories;
    } else {
      throw new Error(apiResponse.message);
    }
  } catch (error) {
    throw new Error("Failed to fetch data: " + error.message);
  }
};

// 재고 조회수 조회
export const fetchInventoryView = async (inventoryId) => {
  // 로컬에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(
      `https://api.yellobook.site/api/v1/inventories/${inventoryId}/views`,
      {}, // patch 요청 시 빈 객체로 data를 전달
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch data: " + error);
  }
};

// 제품 삭제
export const deleteProduct = async (productId) => {
  const accessToken = localStorage.getItem("accessToken");
  const url = `https://api.yellobook.site/api/v1/inventories/products/${productId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.isSuccess) {
      return response.data.message;
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
    console.error("url", url);
    console.log("Product ID:", productId, "Type:", typeof productId);
    throw new Error(
      "Failed to delete product: " +
        (error.response?.data?.message || error.message)
    );
  }
};

// 특정 인벤토리에 대한 제품 목록을 가져오는 함수
// 일별 재고 현황 상세 조회
export const fetchProductsByInventoryId = async (inventoryId) => {
  const accessToken = localStorage.getItem("accessToken");
  //localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories/${inventoryId}`,
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

// 재고 검색
export const searchProducts = async (inventoryId, keyword) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories/${inventoryId}/search`,
      {
        params: { keyword: keyword },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.isSuccess) {
      return response.data.data.products;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Failed to search products: " + error.message);
  }
};

// 제품 수량 수정
export const updateProductAmount = async (productId, amount) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.put(
      `https://api.yellobook.site/v1/inventories/products/${productId}`,
      {
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Failed to update product amount: " + error.message);
  }
};
