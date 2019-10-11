import {createAction} from 'redux-actions';
import {SET_LANGUAGE} from './types';


const setLanguageAction = createAction(SET_LANGUAGE);

export const setLanguage = (language) => (dispatch) => {
    dispatch(setLanguageAction(language))
}

