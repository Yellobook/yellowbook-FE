import axios from "axios";
// 공지 조회
export const GetNotice = async (informId) => {
  try {
    // 로컬에서 토큰 가져오기
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken = process.env.REACT_APP_ORDERER_TOKEN;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/informs/${informId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};

// 공지 삭제
export const DeleteNotice = async (informId) => {
  try {
    // 로컬에서 토큰 가져오기
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken = process.env.REACT_APP_ORDERER_TOKEN;
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/v1/informs/${informId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

// 공지 댓글 쓰기
export const PostComment = async (informId, content) => {
  try {
    // 로컬에서 토큰 가져오기
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken = process.env.REACT_APP_ORDERER_TOKEN;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/informs/${informId}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

// 공지 작성
// data에는 title, memo, mentioned, date
export const PostNotice = async (data) => {
  try {
    // 로컬에서 토큰 가져오기
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken = process.env.REACT_APP_ORDERER_TOKEN;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/informs`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};
