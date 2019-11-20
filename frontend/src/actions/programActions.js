import {
  GET_ALL_PROGRAMS,
  GET_ALL_ACTIVE_PROGRAMS,
  GET_ONE_PROGRAM,
  CREATE_NEW_PROGRAM,
  UPDATE_PROGRAM,
  SET_LOADING
} from '../actions/types';
import programService from '../services/programs';

// get program list fo
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

// get one program by id
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

// create new program
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

// update program
export const updateProgram = updatedProgram => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const updated = await programService.updateProgram(updatedProgram);
    console.log(updated);
    dispatch({
      type: UPDATE_PROGRAM,
      data: updatedProgram
    });
    // const programs = await programService.getAll();
    // dispatch({
    //   type: GET_ALL_PROGRAMS,
    //   data: programs
    // });
  } catch (error) {
    console.log(error);
  }
};

export const mergePrograms = mergeParams => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const mergeAction = await programService.mergePrograms(mergeParams);
    console.log(mergeAction);
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs
    });
  } catch (error) {
    console.log(error);
  }
};
