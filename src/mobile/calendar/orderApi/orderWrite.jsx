import axios from "axios";
// [주문자] 주문 작성
const orderWrite = async (productId, memo, date, orderAmount) => {
  try {
    // 로컬에서 토큰 가져오기
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNzI0MTkxNDYyLCJleHAiOjE3MjQxOTg2NjJ9.W31-pl8p0HY7nqjQ94U8Q3mgZfbMMq6swk3FjRZlJcM";

    const response = await axios.post(
      `https://api.yellobook.site/api/v1/orders`,
      {
        productId,
        memo,
        date,
        orderAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[주문자] 주문 작성 실패:", error);
    throw error;
  }
};

export default orderWrite;
