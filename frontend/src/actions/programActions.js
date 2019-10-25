import {
  GET_ALL_PROGRAMS,
  GET_ONE_PROGRAM,
  SET_LOADING
} from '../actions/types';
import programService from '../services/programs';

// get all programs
export const initializePrograms = () => async dispatch => {
  try {
    setLoading();
    const programs = await programService.getAll();
    dispatch({
      type: GET_ALL_PROGRAMS,
      data: programs
    });
  } catch (err) {
    console.log(err);
  }
};

// get one program by id
export const getOneProgram = id => async dispatch => {
  try {
    setLoading();
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

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
