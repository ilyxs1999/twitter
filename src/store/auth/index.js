import {SET_LOGIN_FLAG} from './types';
const initialState = {
  isLogin: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_FLAG: {
      return {
        ...state,
        isLogin: action.payload,
      };
    }
    default:
      return state;
  }
}
