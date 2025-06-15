import axios from 'axios';

const URL = 'https://68497ceb45f4c0f5ee71a6fb.mockapi.io/ideas';

const getAllIdeas = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};

const getIdeaById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching idea:', error);
    throw error;
  }
};
const createIdea = async (data) => {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating idea:', error);
    throw error;
  }
};
const updateIdea = async (id, data) => {
  try {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating idea:', error);
    throw error;
  }
};
const deleteIdea = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};
export { createIdea, deleteIdea, getAllIdeas, getIdeaById, updateIdea };
