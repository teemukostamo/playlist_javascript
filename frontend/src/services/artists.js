import axios from 'axios';
const baseUrl = '/api/artists';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get artist details
const getOneArtist = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/details/${id}`, config);
  return response.data;
};

const getAlbumsByArtist = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/albumsby/${id}`, config);
  return response.data;
};

const updateArtist = async artistToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('artistservice updated track', artistToUpdate);
  const response = await axios.put(
    `${baseUrl}/details/${artistToUpdate.id}`,
    artistToUpdate,
    config
  );
  console.log(response.data);
  return response.data;
};

export default {
  setToken,
  updateArtist,
  getOneArtist,
  getAlbumsByArtist
};
