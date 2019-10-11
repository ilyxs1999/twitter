import {createAction} from 'redux-actions';
import {REMOVE_USER, SET_USER, SET_TOKEN, REMOVE_TOKEN} from './types';
import {changeUserParams} from '../../api/user';


const setUserAction = createAction(SET_USER);
const removeUserAction = createAction(REMOVE_USER);
const setTokenAction = createAction(SET_TOKEN)
const removeTokenAction = createAction(REMOVE_TOKEN)

export const setUserInfo = (user) => (dispatch) => {
    dispatch(setUserAction(user))
}

export const removeUserInfo = () => (dispatch) => {
    dispatch(removeUserAction())
}

export const setUserToken = (token) => (dispatch) => {
    dispatch(setTokenAction(token))
}

export const removeUserToken = () => (dispatch) => {
    dispatch(removeTokenAction())
}

export const changeUserInfo = (text, userField) => (dispatch, getState) => {
    const {token} = getState().user;
    changeUserParams(userField, text, token)
      .then(({data}) => {
        dispatch(setUserInfo(data));
      })
      .catch(error => {
        alert(error);;
      });
  };