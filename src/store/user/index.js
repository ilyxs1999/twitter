import {REMOVE_USER, SET_USER, SET_TOKEN, REMOVE_TOKEN} from './types';


const initialState = {
  user: {},
  token: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_TOKEN : {
        return {
            ...state,
            token : action.payload,
        }
    }
    case REMOVE_TOKEN : {
        return {
            ...state,
            token : null
        }
    }
    case REMOVE_USER : {
        return{
          ...state,
          user : {}
        }
      }
    default:
      return state;
  }
}
