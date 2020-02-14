import {
  GET_ALL_PROGRAMS,
  GET_ALL_ACTIVE_PROGRAMS,
  GET_ONE_PROGRAM,
  CREATE_NEW_PROGRAM,
  UPDATE_PROGRAM,
  SET_LOADING
} from './types';
import programService from '../services/programs';

export const getAllPrograms = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs
    });
  } catch (err) {
    console.log(err);
  }
};

// get all active programs
export const initializePrograms = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const programs = await programService.getAllActive();
    dispatch({
      type: GET_ALL_ACTIVE_PROGRAMS,
      data: programs
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneProgram = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const program = await programService.getOne(id);
    dispatch({
      type: GET_ONE_PROGRAM,
      data: program,
      id
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewProgram = programToAdd => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const program = await programService.createProgram(programToAdd);
    dispatch({
      type: CREATE_NEW_PROGRAM,
      data: program
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProgram = updatedProgram => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await programService.updateProgram(updatedProgram);
    dispatch({
      type: UPDATE_PROGRAM,
      data: updatedProgram
    });
  } catch (error) {
    console.log(error);
  }
};

export const mergePrograms = mergeParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await programService.mergePrograms(mergeParams);
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs
    });
  } catch (error) {
    console.log(error);
  }
};
