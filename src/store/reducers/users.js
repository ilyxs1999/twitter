import * as types from '../types';

const initialState = {
  loginIn: false,
  users: [],
  user: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER : {
      return {
        ...state,
        user : action.payload
      }
    }
    case types.SET_LOGIN_FLAG : {
      return {
        ...state,
        loginIn : action.payload
      }
    }
    case types.REMOVE_USER : {
      return{
        ...state,
        user : {}
      }
    }
    case types.SET_USERS : {
      return {
        ...state,
        users : action.payload
      }
    }
    default:
      return state;
  }
}
