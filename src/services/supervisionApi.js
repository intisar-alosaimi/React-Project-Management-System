import axios from 'axios';

const URL = 'https://68497ceb45f4c0f5ee71a6fb.mockapi.io/supervision';

const getAllSupervision = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching supervision items:', error);
    throw error;
  }
};
const getSupervisionById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supervision item:', error);
    throw error;
  }
};
const createSupervision = async (data) => {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating supervision item:', error);
    throw error;
  }
};
const updateSupervision = async (id, data) => {
  try {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating supervision item:', error);
    throw error;
  }
};
const deleteSupervision = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting supervision item:', error);
    throw error;
  }
};
export {
  createSupervision,
  deleteSupervision,
  getAllSupervision,
  getSupervisionById,
  updateSupervision,
};
