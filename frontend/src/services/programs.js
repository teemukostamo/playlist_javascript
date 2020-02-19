import axios from 'axios';

const baseUrl = '/api/programs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAllActive = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const req = await axios.get(`${baseUrl}/active`, config);
  return req.data;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const req = await axios.get(`${baseUrl}/all`, config);
  return req.data;
};

const getOne = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(`${baseUrl}/getone/${id}`, config);
  return request.data;
};

const createProgram = async newProgram => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(baseUrl, newProgram, config);
  return request.data;
};

const updateProgram = async updatedProgram => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.put(`${baseUrl}/update`, updatedProgram, config);
  return request.data;
};

const mergePrograms = async mergeParams => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.put(`${baseUrl}/merge`, mergeParams, config);
  return request.data;
};

export default {
  getAllActive,
  getAll,
  getOne,
  createProgram,
  updateProgram,
  mergePrograms,
  setToken
};
