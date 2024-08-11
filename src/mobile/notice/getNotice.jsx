import axios from 'axios';
// 공지 조회
const getNotice = async (informId) => {
  try {
    const response = await axios.get(`/api/v1/informs/${informId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notice:', error);
    throw error;
  }
};

export default getNotice;