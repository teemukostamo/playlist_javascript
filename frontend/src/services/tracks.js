import axios from 'axios';
const baseUrl = '/api/tracks';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const checkDjonlineTracks = async (studioId, date, startTime, endTime) => {
  const tracks = await axios.get(
    `https://www.djonline.fi/playing/playlog.php?id=${studioId}&date=${date}`
  );
  console.log('tracks service raw data fetched from djonline api', tracks);
  let arr = [];
  for (const prop in tracks.data) {
    arr.push(tracks.data[prop]);
  }
  arr = arr.reverse();
  let newArr = [];
  arr.forEach(track => {
    let hours = track.date.charAt(11) + track.date.charAt(12);
    hours = parseInt(hours);
    // make loop skip the songs not matching the start time - end time -window
    if (hours < parseInt(startTime) || hours >= parseInt(endTime)) {
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
      length: track.length,
      track_title: track.song,
      year: track.year
    });
  });
  console.log('trackservice reversed array', newArr);
  const config = {
    headers: { Authorization: token }
  };
  let returnArr = [];
  newArr.forEach(async track => {
    console.log('track to save in track service', track);
    const request = await axios.post(`${baseUrl}/djonline`, track, config);
    console.log('returned track from backend', request.data);
    returnArr.push(request.data);
  });
  console.log('returned array from backend', returnArr);
  return await returnArr;
};

export default { setToken, checkDjonlineTracks };
