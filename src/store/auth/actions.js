import {createAction} from 'redux-actions';
import NavigationService from '../../services/NavigationService';
import {AUTH, POSTS} from '../../constants/routes';
import {register, login, logout} from '../../api/auth';
import {AVATAR} from '../../constants/img';
import {SET_LOGIN_FLAG} from './types';
import {
  setUserInfo,
  removeUserInfo,
  setUserToken,
  removeUserToken,
} from '../user/actions';


const setLoginFlagAction = createAction(SET_LOGIN_FLAG);

export const setLoginFlag = flag => dispatch => {
  dispatch(setLoginFlagAction(flag));
};

export const signUp = (username, email, password, gender) => {
  register(username, email, password, gender, AVATAR)
    .then(function(response) {
      if (response.status == 200) {
        NavigationService.navigate(AUTH, {});
      }
    })
    .catch(function(error) {
      alert(error);
    });
};

export const signIn = (email, password) => dispatch => {
  login(email, password)
    .then(function({data: {token, user}}) {
      dispatch(setUserInfo(user));
      dispatch(setLoginFlag(true));
      dispatch(setUserToken(token));
      NavigationService.navigate(POSTS);
    })
    .catch(function({response: {data}}) {
      alert(data);
    });
};

export const logOut = () => (dispatch, getState) => {
  const {token} = getState().user;
  logout(token)
    .then(() => {
      dispatch(setLoginFlag(false));
      NavigationService.navigate(AUTH);
      dispatch(removeUserInfo());
      dispatch(removeUserToken());
    })
    .catch(error => alert(error));
};
