import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  console.log('userService getAll tulostus');
  const req = await axios.get(baseUrl);
  return req.data;
};

export default { getAll };
