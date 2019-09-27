import * as types from './types';

export function signUp(username, email, password) {
  return {
    type: types.SIGN_UP,
    username,
    email,
    password,
  };
}

export function signIn(email, password) {
  return {
    type: types.SIGN_IN,
    email,
    password,
  };
}

export function sendPost(user, postText, image) {
  return {
    type: types.SEND_POST,
    user,
    postText,
    image,
  };
}
export function likePost(user, postId) {
  return {
    type: types.LIKE_POST,
    user,
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
  return {
    type: types.ADD_COMMENT,
    post,
    commentText,
    user,
    image,
  };
}
