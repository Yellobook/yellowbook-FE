import axios from "axios";
// 제품 이름으로 제품 조회
const inventoryName = async (name) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories/products/search`,
      {
        params: {
          name: name,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("제품 이름으로 제품 조회 오류: ", error);
    throw error;
  }
};

export default inventoryName;
