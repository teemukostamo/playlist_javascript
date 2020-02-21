import axios from 'axios';

const download = require('downloadjs');

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
  const request = await axios.get(`/api/reportslist/date/${date}`, config);
  return request.data;
};

// get all by month and by user
const getAllByDateByUser = async (date, user) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(
    `/api/reportslist/all?date=${date}&user=${user}`,
    config
  );
  return request.data;
};

// get all in progress reports of one user
const getAllInProgress = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(`/api/reportslist/user/${id}`, config);
  return request.data;
};

// get one report with tracks
const getOne = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const getAllTransfers = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get('/api/reporttransfer', config);
  return request.data;
};

const addTrackToReport = async trackToAdd => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(`${baseUrl}`, trackToAdd, config);
  return request.data;
};

const deleteTrackFromReport = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const deleteReport = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.put(`/api/reportslist/${id}`, {}, config);
  return request.data;
};

const updateSortableRank = async remainingTracks => {
  const config = {
    headers: { Authorization: token }
  };
  if (remainingTracks === null) {
    return;
  }
  remainingTracks.forEach(async (track, index) => {
    const trackToUpdate = {
      sortable_rank: index + 1
    };
    const request = await axios.put(
      `${baseUrl}/${track.report_track_id}`,
      trackToUpdate,
      config
    );
    return request.data;
  });
};

const getReportDetails = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(`/api/reportdetails/details/${id}`, config);
  return request.data;
};

// create new report
const createReport = async newReport => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post('/api/reportdetails', newReport, config);
  return response.data;
};

// update existing report details
const updateReport = async updatedReport => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.put(
    `/api/reportdetails/update/${updatedReport.id}`,
    updatedReport,
    config
  );
  return updatedReport;
};

// generate text file for download
const generateReportDownload = async params => {
  try {
    const config = {
      headers: { Authorization: token, responseType: 'blob' }
    };
    const request = await axios.post('/api/reporttransfer', params, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

// download report
export const downloadReport = async filename => {
  try {
    const config = {
      headers: { Authorization: token, responseType: 'blob' }
    };
    const response = await axios.get(`/api/reporttransfer/${filename}`, config);
    download(response.data, filename);
  } catch (error) {
    console.log(error);
  }
};

export default {
  setToken,
  addTrackToReport,
  deleteTrackFromReport,
  deleteReport,
  updateSortableRank,
  getOne,
  getAllByDate,
  getAllByDateByUser,
  getAllInProgress,
  getAllTransfers,
  getReportDetails,
  createReport,
  updateReport,
  generateReportDownload,
  downloadReport
};
