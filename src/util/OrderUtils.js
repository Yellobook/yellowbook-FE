import axios from "axios";

// [주문자, 관리자] 주문 조회
export const orderGet = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 조회:", error);
    throw error;
  }
};

// 주문 취소
export const orderDelete = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `https://api.yellobook.site/api/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// [주문자, 관리자] 주문 댓글 조회
export const orderGetComment = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/orders/${orderId}/comment`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 댓글 조회:", error);
    throw error;
  }
};

// [관리자] 주문 확정
export const orderPatchConfirm = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `https://api.yellobook.site/api/v1/orders/${orderId}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[관리자] 주문 확정:", error);
    throw error;
  }
};

// [관리자] 주문 정정 요청
export const orderPatchCorr = async (orderId) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `https://api.yellobook.site/api/v1/orders/${orderId}/correction`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[관리자] 주문 정정 요청:", error);
    throw error;
  }
};

// [주문자, 관리자] 주문에 댓글 달기
export const orderPostComment = async (orderId, content) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://api.yellobook.site/api/v1/orders/${orderId}/comment`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 댓글 작성 실패:", error);
    throw error;
  }
};

// [주문자] 주문 작성
export const orderWrite = async (productId, memo, date, orderAmount) => {
  try {
    // 로컬에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");
    //const accessToken = process.env.REACT_APP_ORDERER_TOKEN;
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

// [주문자, 관리자] 주문 댓글 조회
export const fetchComments = async (orderId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://api.yellobook.site/api/v1/orders/${orderId}/comment`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data.comments;
  } catch (error) {
    console.error("[주문자, 관리자] 주문 댓글 조회 중 오류 발생 : ", error);
    throw error;
  }
};
