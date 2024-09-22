import axios from "axios";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // 환경 변수에서 baseURL 가져옴
});

// 요청 인터셉터: 요청마다 Authorization 헤더에 accessToken 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 재발급 요청
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지 플래그 설정
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/token/reissue`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
          }
        );
        console.log(data);
        // 새로 받은 accessToken 저장
        localStorage.setItem("accessToken", data.accessToken);

        // 원래 요청에 새로운 토큰 추가
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // 요청 다시 시도
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        // refreshToken도 만료된 경우 로그아웃 처리 등
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
