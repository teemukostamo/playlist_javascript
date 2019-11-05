import axios from 'axios';
const baseUrl = '/api/reports';
const download = require('downloadjs');

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

  const request = await axios.get(`/api/reportslist/date/${date}`, config);
  console.log('reportservice get one report-track data', request.data);
  return request.data;
};

// get all in progress reports of one user
const getAllInProgress = async id => {
  const config = {
    headers: { Authorization: token }
  };
  // notice baseurl is different here!
  console.log('getting reports from id', id);

  const request = await axios.get(`/api/reportslist/user/${id}`, config);
  console.log('reportservice get all in progress by user id', request.data);
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

const getAllTransfers = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get('/api/reporttransfer', config);
  console.log('reportservice get all transfers data', request.data);
  return request.data;
};

const addTrackToReport = async trackToAdd => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(`${baseUrl}`, trackToAdd, config);
  console.log('reportservice add track to report', request.data);
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

  const request = await axios.delete(`/api/reportslist/${id}`, config);
  return request.data;
};

const updateSortableRank = async remainingTracks => {
  const config = {
    headers: { Authorization: token }
  };
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
  console.log('reportdetails req id ', id);
  const request = await axios.get(`/api/reportdetails/${id}`, config);
  console.log('reportservice get report details res data', request.data);
  return request.data;
};

// create new report
const createReport = async newReport => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post('/api/reportdetails', newReport, config);
  console.log(response.data);
  return response.data;
};

// update existing report details
const updateReport = async updatedReport => {
  const config = {
    headers: { Authorization: token }
  };

  console.log('reportservice report to update', updatedReport);
  const request = axios.put(
    `/api/reportdetails/${updatedReport.id}`,
    updatedReport,
    config
  );
  console.log(request.data);
  return updatedReport;
};

// generate text file for download
export const generateReportDownload = async params => {
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
  getAllInProgress,
  getAllTransfers,
  getReportDetails,
  createReport,
  updateReport,
  generateReportDownload,
  downloadReport
};
