import axios from 'axios';
// 공지 작성
// data에는 title, memo, mentioned, date
const postNotice = async (data) => {
  try {
    const response = await axios.post(`/api/v1/informs/`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching notice:', error);
    throw error;
  }
};

export default postNotice;