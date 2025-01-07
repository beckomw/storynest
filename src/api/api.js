import axios from 'axios';

export const fetchStories = () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/stories`);
};

export const fetchStory = (story_id) => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/stories/${story_id}`);
}

export const createStory = (token, storyData) => {
  return axios.post(`${import.meta.env.VITE_BACKEND_URL}/stories`, storyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    },
  });
};

export const updateStory = (token, story_id, storyData) => {
  return axios.put(`${import.meta.env.VITE_BACKEND_URL}/stories/${story_id}`, storyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export const updateStoryLikes = (token, story_id, storyData) => {
  return axios.put(`${import.meta.env.VITE_BACKEND_URL}/stories/${story_id}/likes`, storyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export const deleteStory = (token, story_id) => {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/stories/${story_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getComments = (story_id) => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/${story_id}`);
}

export const createComment = (token, commentData, story_id) => {
  return axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments/${story_id}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export const updateComment = (token, comment_id, commentData) => {
  return axios.put(`${import.meta.env.VITE_BACKEND_URL}/comments/${comment_id}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export const deleteComment = (token, comment_id) => {
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/comments/${comment_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
