import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.yellobook.site",
});

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/token/reissue`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        }
      );
    }
    return Promise.reject(error);
  }
);
