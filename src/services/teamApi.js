import axios from 'axios';
const URL = 'https://68497ceb45f4c0f5ee71a6fb.mockapi.io/teams';

const getAllTeams = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
const getTeamById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};
const createTeam = async (data) => {
  try {
    const response = await axios.post(URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};
const updateTeam = async (id, data) => {
  try {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};
const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};

export { createTeam, deleteTeam, getAllTeams, getTeamById, updateTeam };
