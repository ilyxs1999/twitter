import * as types from '../types';

const initialState = {
  language: "en",
};

export default function language(state = initialState, action) {
  switch (action.type) {
      case types.SET_LANGUAGE : {
          return {
              ...state,
              language : action.language
          }
      }
      default:
        return state;
  }
}
