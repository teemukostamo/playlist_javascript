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
  const request = await axios.get(`${baseUrl}/autocomplete/${query}`, config);
  console.log('search service get autocomplete tracks req data', request.data);
  return request.data;
};

const getCatIdFromDiscogs = async query => {
  const request = await axios.get(
    `https://api.discogs.com/database/search?artist=${query.artist}&release_title=${query.album}&token=${process.env.REACT_APP_DISCOGS_TOKEN}`
  );
  return request.data;
};

const getTop100 = async query => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(
    `/api/top100?list=${query.list}&start_date=${query.start_date}&end_date=${query.end_date}`,
    config
  );
  return request.data;
};

const advancedSearch = async searchParams => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(
    `${baseUrl}/advanced?kind=${searchParams.kind}&query=${searchParams.query}`,
    config
  );
  return request.data;
};

const merge = async mergeParams => {
  const config = {
    headers: { Authorization: token }
  };
  console.log(mergeParams);
  const request = await axios.put(`${baseUrl}/advanced`, mergeParams, config);
  return request.data;
};

export default {
  setToken,
  getTracksForSearch,
  advancedSearch,
  getCatIdFromDiscogs,
  getTop100,
  merge
};
