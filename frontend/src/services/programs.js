import axios from 'axios';
const baseUrl = '/api/programs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get all programs
const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const req = await axios.get(baseUrl, config);
  return req.data;
};

// get one program
const getOne = async id => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('program req id', id);
  const request = await axios.get(`${baseUrl}/${id}`, config);
  console.log('programservice get one program data', request.data);
  return request.data;
};

const createProgram = async newProgram => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(baseUrl, newProgram, config);
  return request.data;
};

export default { getAll, getOne, createProgram, setToken };
