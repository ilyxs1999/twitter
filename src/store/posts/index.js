import {SEND_POST,SEND_VOICE_POST,LIKE_POST,ADD_COMMENT} from './types';

const initialState = {
  posts: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case SEND_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case SEND_VOICE_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case LIKE_POST: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
}
