import {
  GET_DJONLINE_TRACKS,
  ADD_NEW_TRACK,
  ADD_TRACK_TO_ALBUM,
  UPDATE_TRACK,
  SET_LOADING,
  GET_ONE_TRACK,
  GET_ONE_TRACK_HISTORY,
  CLEAR_CURRENT_TRACK,
  REMOVE_CURRENT_TRACK,
  CHANGE_ALBUM,
  CHANGE_ARTIST,
  MERGE_TRACKS,
  ADD_TRACK_TO_REPORT
} from './types';
import trackService from '../services/tracks';
import searchService from '../services/search';
import reportService from '../services/reports';

export const getDjonlineTracks = searchParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const tracks = await trackService.checkDjonlineTracks(searchParams);
    dispatch({
      type: GET_DJONLINE_TRACKS,
      data: tracks
    });
  } catch (error) {
    console.log(error);
  }
};

// add a new track and save it to current report
export const addNewTrack = trackToAdd => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const track = await trackService.addNewTrack(trackToAdd);
    dispatch({
      type: ADD_NEW_TRACK,
      data: track
    });
  } catch (error) {
    console.log(error);
  }
};

// add a new track to db - not in a report
export const addTrackToDb = trackToAdd => async () => {
  try {
    const track = await trackService.addTrackToDb(trackToAdd);
    console.log(track);
  } catch (error) {
    console.log(error);
  }
};

export const addTrackToAlbum = trackToAdd => async dispatch => {
  try {
    const track = await trackService.addTrackToAlbum(trackToAdd);
    console.log(track);
    dispatch({
      type: ADD_TRACK_TO_ALBUM,
      data: track
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTrackToAlbumAndReport = trackToAdd => async dispatch => {
  try {
    const track = await trackService.addTrackToAlbum(trackToAdd);
    const trackToReport = {
      track_id: track.track_id,
      report_id: trackToAdd.report_id,
      length: trackToAdd.length,
      sortable_rank: trackToAdd.sortable_rank
    };
    const report = await reportService.addTrackToReport(trackToReport);
    const trackToReducer = {
      ...report,
      ...track
    };
    dispatch({
      type: ADD_TRACK_TO_ALBUM,
      data: track
    });
    dispatch({
      type: ADD_TRACK_TO_REPORT,
      data: trackToReducer
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTrack = trackToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updatedTrack = await trackService.updateTrack(trackToUpdate);
    dispatch({
      type: UPDATE_TRACK,
      data: updatedTrack
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTrack = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const track = await trackService.getOneTrack(id);
    dispatch({
      type: GET_ONE_TRACK,
      data: track
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTrackHistory = id => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CURRENT_TRACK
    });
    dispatch({
      type: SET_LOADING
    });
    const history = await trackService.getOneTrackHistory(id);
    dispatch({
      type: GET_ONE_TRACK_HISTORY,
      data: history
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeCurrentTrack = () => async dispatch => {
  dispatch({
    type: REMOVE_CURRENT_TRACK
  });
};

export const mergeTrackFunction = mergeParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const mergeAction = await searchService.merge(mergeParams);
    console.log(mergeAction);
    const track = await trackService.getOneTrack(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_TRACK,
      data: track
    });
    const history = await trackService.getOneTrackHistory(mergeParams.mergeTo);
    dispatch({
      type: GET_ONE_TRACK_HISTORY,
      data: history
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeAlbumId = albumToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updateAlbum = await trackService.updateAlbumId(albumToUpdate);
    console.log(updateAlbum);
    dispatch({
      type: CHANGE_ALBUM,
      data: albumToUpdate
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeArtistId = artistToUpdate => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updateArtist = await trackService.updateArtistId(artistToUpdate);
    console.log(updateArtist);
    dispatch({
      type: CHANGE_ARTIST,
      data: artistToUpdate
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTrackState = mergeParams => async dispatch => {
  dispatch({
    type: MERGE_TRACKS,
    data: mergeParams
  });
};
