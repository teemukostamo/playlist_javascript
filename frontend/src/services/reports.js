import axios from 'axios';
const baseUrl = '/api/reports';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get a list of reports by date

// get a list of reports by user_id, date

// get one report with tracks
const getOne = async id => {
  console.log('report req id', id);
  const request = await axios.get(`${baseUrl}/${id}`);
  console.log('reportservice get one report-track data', request.data);
  return request.data;
};

export default { getOne };
