import axios from "axios";  

// const accessToken = localStorage.getItem('accessToken');
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NCwiaWF0IjoxNzI0MTc5NTg2LCJleHAiOjE3MjQxODY3ODZ9.paHl44ocXwmMR3xnQ1qCGHEYOsMVL7b7xGtZTWb4fA8';
    
export const logoutUser = async () => {
    try {
      await axios.post(
        "https://api.yellobook.site/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("로그아웃 중 오류 발생", error);
    }
  };
  

export const deleteUser =async()=>{
    try {
        const deactivateUser_res = await axios.post(
          "https://api.yellobook.site/api/v1/auth/deactivate",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(deactivateUser_res.data.message);
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생", error);
      }
}