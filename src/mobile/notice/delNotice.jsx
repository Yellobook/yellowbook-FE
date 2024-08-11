import axios from 'axios';

// 공지 삭제
const deleteNotice = async (informId) => {
  try {
    const response = await axios.delete(`/api/v1/informs/${informId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notice:', error);
    throw error;
  }
};

export default deleteNotice;
