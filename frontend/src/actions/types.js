// Login actions:
export const INIT_USER = 'INIT_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

// user actions
export const INIT_USERS_LIST = 'INIT_USERS_LIST';
export const USER_ERROR = 'USER_ERROR';
export const SET_CURRENT = 'SET_CURRENT';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

// report actions
export const GET_ONE_REPORT = 'GET_ONE_REPORT';
export const GET_REPORT_DETAILS = 'GET_REPORT_DETAILS';
export const GET_ALL_REPORTS_BY_DATE = 'GET_ALL_REPORTS_BY_DATE';
export const GET_ALL_IN_PROGRESS = 'GET_ALL_IN_PROGRESS';
export const GET_ALL_REPORT_TRANSFERS = 'GET_ALL_REPORT_TRANSFERS';
export const GENERATE_REPORT_TRANSFER = 'GENERATE_REPORT_TRANSFER';
export const CREATE_REPORT = 'CREATE_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const DELETE_REPORT = 'DELETE_REPORT';
export const GET_DJONLINE_TRACKS = 'GET_DJONLINE_TRACKS';
export const REPORT_ERROR = 'REPORT_ERROR';
export const CLEAR_CURRENT_REPORT = 'CLEAR_CURRENT_REPORT';
export const DELETE_TRACK_FROM_REPORT = 'DELETE_TRACK_FROM_REPORT';
export const CHECK_FOR_DELETE = 'CHECK_FOR_DELETE';
export const UNCHECK_FOR_DELETE = 'UNCHECK_FOR_DELETE';
export const DOWNLOAD_REPORT = 'DOWNLOAD_REPORT';
export const FILTER_BY_USER_ID = 'FILTER_BY_USER_ID';
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS';
export const FILTER_BY_TEXT = 'FILTER_BY_TEXT';
export const SET_EDIT_TRACK_ID = 'SET_EDIT_TRACK_ID';

// program actions
export const GET_ALL_PROGRAMS = 'GET_ALL_PROGRAMS';
export const GET_ALL_ACTIVE_PROGRAMS = 'GET_ALL_ACTIVE_PROGRAMS';
export const GET_ONE_PROGRAM = 'GET_ONE_PROGRAM';
export const CREATE_NEW_PROGRAM = 'CREATE_NEW_PROGRAM';
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM';

// search actions
export const AUTOCOMPLETE_RESULTS = 'AUTOCOMPLETE_RESULTS';
export const ADVANCED_RESULTS = 'ADVANCED_RESULTS';
export const SORT_ADVANCED_RESULTS = 'SORT_ADVANCED_RESULTS';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const GET_DISCOGS_CATID = 'GET_DISCOGS_CATID';
export const CLEAR_DISCOGS_CATID = 'CLEAR_DISCOGS_CATID';
export const TOP_100 = 'TOP_100';
export const TOP_100_QUERY = 'TOP_100_QUERY';
export const GET_CHANGE_ALBUM_OPTIONS = 'GET_CHANGE_ALBUM_OPTIONS';
export const GET_CHANGE_ARTIST_OPTIONS = 'GET_CHANGE_ARTIST_OPTIONS';
export const RESET_CHANGE_ALBUM_OPTIONS = 'RESET_CHANGE_ALBUM_OPTIONS';
export const RESET_CHANGE_ARTIST_OPTIONS = 'RESET_CHANGE_ARTIST_OPTIONS';

// track actions
export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const UPDATE_TRACK = 'UPDATE_TRACK';
export const GET_ONE_TRACK = 'GET_ONE_TRACK';
export const GET_ONE_TRACK_HISTORY = 'GET_ONE_TRACK_HISTORY';
export const CLEAR_CURRENT_TRACK = 'CLEAR_CURRENT_TRACK';
export const REMOVE_CURRENT_TRACK = 'REMOVE_CURRENT_TRACK';
export const CHANGE_ALBUM = 'CHANGE_ALBUM';
export const CHANGE_ARTIST = 'CHANGE_ARTIST';

// artist actions
export const GET_ONE_ARTIST = 'GET_ONE_ARTIST';
export const GET_ALBUM_LIST_BY_ARTIST = 'GET_ALBUM_LIST_BY_ARTIST';
export const CLEAR_CURRENT_ARTIST = 'CLEAR_CURRENT_ARTIST';

// album actions
export const GET_ONE_ALBUM = 'GET_ONE_ALBUM';
export const GET_TRACKLIST_OF_ALBUM = 'GET_TRACKLIST_OF_ALBUM';
export const CLEAR_CURRENT_ALBUM = 'CLEAR_CURRENT_ALBUM';

// preloader actions
export const SET_LOADING = 'SET_LOADING';
