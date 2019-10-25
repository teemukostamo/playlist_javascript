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

export default { getAll, setToken };
