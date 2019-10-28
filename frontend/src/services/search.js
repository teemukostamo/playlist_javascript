import axios from 'axios';
const baseUrl = '/api/search';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getTracksForSearch = async query => {
  const config = {
    headers: { Authorization: token }
  };

  console.log('autocomplete search query', query);
  const request = await axios.get(`${baseUrl}/tracks/${query}`, config);
  console.log('search service get autocomplete tracks req data', request.data);
  return request.data;
};

export default { setToken, getTracksForSearch };
