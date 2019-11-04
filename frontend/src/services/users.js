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
  console.log(typeof req.date);
  return req.data;
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

export default { getAll, setToken, updateUser };
