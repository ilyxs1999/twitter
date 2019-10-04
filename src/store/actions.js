import * as types from './types';
import ids from 'shortid';
import * as IMAGES from '../constants/img';
import {api} from '../api/index';

export function getUsers() {
  return dispatch =>
    api
      .get('/users')
      .then(response => {
        dispatch({
          type: types.GET_USERS,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
}

export function signUp(username, email, password) {
  const newUser = {
    id: ids.generate(),
    username: username,
    email: email,
    password: password,
    avatarUri: IMAGES.AVATAR,
  };
  return {
    type: types.SIGN_UP,
    newUser,
  };
}

export function signIn(email, password) {
  return {
    type: types.SIGN_IN,
    email,
    password,
  };
}

export function sendVoicePost(user, path) {
  const post = {
    postId: ids.generate(),
    time: new Date().valueOf(),
    usersLike: [],
    comments: [],
    postText: null,
    location: null,
    image: null,
    user,
    path,
  };
  return {
    type: types.SEND_VOICE_POST,
    post,
  };
}

export function sendPost(user, postText, image, location) {
  const post = {
    postId: ids.generate(),
    user: user,
    postText: postText,
    time: new Date().valueOf(),
    usersLike: [],
    image: image,
    comments: [],
    path: null,
    location: location,
  };
  return {
    type: types.SEND_POST,
    post,
  };
}
export function likePost(id, postId) {
  return {
    type: types.LIKE_POST,
    id,
    postId,
  };
}
export function setAvatar(avatarUri) {
  return {
    type: types.SET_AVATAR,
    avatarUri,
  };
}
export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
export function changeUsername(username) {
  return {
    type: types.CHANGE_USERNAME,
    username,
  };
}
export function changePassword(password) {
  return {
    type: types.CHANGE_PASSWORD,
    password,
  };
}
export function changeEmail(email) {
  return {
    type: types.CHANGE_EMAIL,
    email,
  };
}
export function addComment(post, commentText, user, image) {
  const comment = {
    commentId: ids.generate(),
    commentText: commentText,
    user: user,
    time: new Date(),
    commentImage: image,
  };
  return {
    type: types.ADD_COMMENT,
    comment,
    post,
  };
}
