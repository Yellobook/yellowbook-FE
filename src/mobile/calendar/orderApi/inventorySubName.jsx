import axios from "axios";
// 제품 이름으로 하위 제품 조회
const inventoryChildName = async (name) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/inventories/subProducts/search`,
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
    console.error("제품 이름으로 하위 제품 조회 실패: ", error);
    throw error;
  }
};

export default inventoryChildName;
