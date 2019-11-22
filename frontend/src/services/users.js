import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const req = await axios.get(baseUrl, config);
  return req.data;
};

const createUser = async userToAdd => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(baseUrl, userToAdd, config);
  return request.data;
};

const updateUser = async userToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(
    `${baseUrl}/${userToUpdate.id}`,
    userToUpdate,
    config
  );
  return response.data;
};

const deleteUser = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, createUser, updateUser, deleteUser };
