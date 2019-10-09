import * as types from '../types';

const initialState = {
  posts: [],
  voicePosts: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case types.SEND_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case types.SEND_VOICE_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case types.LIKE_POST: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case types.ADD_COMMENT: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
}
