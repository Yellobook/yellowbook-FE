import axios from "axios";

export const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get('https://api.yellobook.site/api/v1/members/profile', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("프로필 불러오기 중 오류 발생");
    }
};