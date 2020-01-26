import axios from 'axios';
const baseUrl = '/api/albums';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getOneAlbum = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/albumdetails/${id}`, config);
  return response.data;
};

const getTracklistOfAlbum = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/tracklist/${id}`, config);
  return response.data;
};

const updateAlbum = async albumToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('albumservice updated album', albumToUpdate);
  console.log('album to update', albumToUpdate);
  const response = await axios.put(
    `${baseUrl}/albumdetails/${albumToUpdate.id}`,
    albumToUpdate,
    config
  );
  console.log(response.data);
  return response.data;
};

export default {
  setToken,
  updateAlbum,
  getOneAlbum,
  getTracklistOfAlbum
};