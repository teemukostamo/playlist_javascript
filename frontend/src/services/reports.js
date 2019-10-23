import axios from 'axios';
const baseUrl = '/api/reports';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get a list of reports by date
const getAllByDate = async date => {
  const config = {
    headers: { Authorization: token }
  };
  // notice baseurl is different here!
  console.log('getting reports from', date);

  const request = await axios.get(`/api/reportslist/${date}`, config);
  console.log('reportservice get one report-track data', request.data);
  return request.data;
};

// get a list of reports by user_id, date

// get one report with tracks
const getOne = async id => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('report req id', id);
  const request = await axios.get(`${baseUrl}/${id}`, config);
  console.log('reportservice get one report-track data', request.data);
  return request.data;
};

const getReportDetails = async id => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('reportdetails req id ', id);
  const request = await axios.get(`/api/reportdetails/${id}`, config);
  console.log('reportservice get report details res data', request.data);
  return request.data;
};

export default { setToken, getOne, getAllByDate, getReportDetails };