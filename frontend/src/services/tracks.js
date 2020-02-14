import axios from 'axios';

const baseUrl = '/api/tracks';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const checkDjonlineTracks = async searchParams => {
  const config = {
    headers: { Authorization: token }
  };
  const tracks = await axios.get(
    `${process.env.REACT_APP_PLAYLOG_URL}?id=${searchParams.studioId}&date=${searchParams.date}`
  );

  let arr = [];
  const entries = Object.entries(tracks.data);
  // eslint-disable-next-line no-unused-vars
  entries.forEach(([key, value]) => {
    arr.push(value);
  });
  arr = arr.reverse();

  // old with for of
  // let arr = [];
  // for (const prop in tracks.data) {
  //   arr.push(tracks.data[prop]);
  // }
  // console.log('arr', arr);
  // arr = arr.reverse();
  const newArr = [];
  arr.forEach(track => {
    let hours = track.date.charAt(11) + track.date.charAt(12);
    hours = parseInt(hours);
    const a = track.length.split(':');
    const seconds = parseInt(a[0]) * 60 + parseInt(a[1]);
    // make loop skip the songs not matching the start time - end time -window
    if (
      hours < parseInt(searchParams.startTime) ||
      hours >= parseInt(searchParams.endTime)
    ) {
      return;
    }
    newArr.push({
      album_name: track.album,
      artist_name: track.artist,
      cat_id: track.matrix,
      disc_no: track.side,
      track_no: track.tracknumber,
      isrc: track.isrc,
      record_country: track.recording_country,
      country: null,
      play_time: track.date,
      djonline_id: track.id,
      label: track.label,
      length: seconds,
      track_title: track.song,
      year: track.year,
      // sortable_rank: searchParams.sortable_rank_start + index + 1,
      report_id: searchParams.report_id
    });
  });
  console.log('array of tracks going to backend', newArr);
  const newerArr = [];
  newArr.forEach((track, index) => {
    newerArr.push({
      ...track,
      sortable_rank: searchParams.sortable_rank_start + index + 1
    });
  });
  const returnArr = [];
  console.log('new arr to backend with sortable ranks', newerArr);
  newerArr.forEach(async track => {
    const request = await axios.post(`${baseUrl}/djonline`, track, config);
    returnArr.push(request.data);
  });
  console.log('returned array from backend', returnArr);
  return returnArr;
};

// add new track and save it to a report
const addNewTrack = async trackToAdd => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(
    `${baseUrl}/addandreport`,
    trackToAdd,
    config
  );
  return response.data;
};

// add new track without saving to report
const addTrackToDb = async trackToAdd => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(`${baseUrl}/addtodb`, trackToAdd, config);
  return response.data;
};

const updateTrack = async trackToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(baseUrl, trackToUpdate, config);
  return response.data;
};

const updateAlbumId = async albumToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(
    '/api/tracks/updatealbum',
    albumToUpdate,
    config
  );
  return response.data;
};

const updateArtistId = async artistToUpdate => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(
    '/api/tracks/updateartist',
    artistToUpdate,
    config
  );
  return response.data;
};

const getOneTrack = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/details/${id}`, config);
  return response.data;
};

const getOneTrackHistory = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(`${baseUrl}/history/${id}`, config);
  return response.data;
};

export default {
  setToken,
  checkDjonlineTracks,
  addNewTrack,
  updateTrack,
  getOneTrack,
  getOneTrackHistory,
  updateAlbumId,
  updateArtistId,
  addTrackToDb
};
