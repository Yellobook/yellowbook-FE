import axios from "axios";
// 마이프로필 조회
export const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("프로필 불러오기 중 오류 발생");
    }
};

// 사용자가 현재 위치한 팀 조회
export const getTeam = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/teams/current`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("사용자가 현재 위치한 팀 조회 중 오류 발생");
    }
};