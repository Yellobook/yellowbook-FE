import axios from 'axios';

const postComment = async (informId, content) => {
  try {
    const response = await axios.post(`/api/v1/informs/${informId}/comment`, {
      content
    });
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};

export default postComment;