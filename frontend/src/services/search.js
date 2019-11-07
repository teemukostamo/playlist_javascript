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

const getCatIdFromDiscogs = async query => {
  const request = await axios.get(
    `https://api.discogs.com/database/search?artist=${query.artist}&release_title=${query.album}&token=${process.env.REACT_APP_DISCOGS_TOKEN}`
  );
  return request.data;
};

export default { setToken, getTracksForSearch, getCatIdFromDiscogs };
