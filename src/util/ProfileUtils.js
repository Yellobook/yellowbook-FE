import axios from "axios";

export const getProfile = async () => {
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NCwiaWF0IjoxNzI0MTc3MDAzLCJleHAiOjE3MjQxODQyMDN9.2sosEJr1kTRTFOezkcgbogSOhtJRWb4JGxxDsiAa2ac';
    try {
        const response = await axios.get('https://api.yellobook.site/api/v1/members/profile', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("프로필 불러오기 중 오류 발생");
    }
};