import * as types from './types';
import ids from 'shortid';
import {AVATAR} from '../constants/img';
import {createAction} from 'redux-actions';
import NavigationService from '../services/NavigationService';
import {AUTH, POSTS} from "../constants/routes"


const setUserAction = createAction(types.SET_USER);
const setLoginFlag = createAction(types.SET_LOGIN_FLAG);
const sendVoicePostAction = createAction(types.SEND_VOICE_POST);
const sendPostAction = createAction(types.SEND_POST);
const likePostAction = createAction(types.LIKE_POST);
const addCommentAction = createAction(types.ADD_COMMENT);
const removeUserAction = createAction(types.REMOVE_USER);
const setUsersAction = createAction(types.SET_USERS);

export const signUp = (username, email, password) => (dispatch, getState) => {
  const {users} = getState().users
  const newUser = {
    id: ids.generate(),
    username: username,
    email: email,
    password: password,
    avatarUri: AVATAR,
  };
  dispatch(setUsersAction([...users,newUser]));
  NavigationService.navigate(AUTH, {});
};

export const signIn = (email, password) => (dispatch, getState) => {
  const {users} = getState().users;
  const index = users.findIndex(user => {
    return user.email == email && user.password == password;
  });
  if (index != -1) {
    dispatch(setUserAction(users[index]));
    dispatch(setLoginFlag(true));
    NavigationService.navigate(POSTS);
  }
};

export const sendVoicePost = (user, path) => dispatch => {
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
  dispatch(sendVoicePostAction(post));
};

export const sendPost = (user, postText, image, location) => dispatch => {
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
  dispatch(sendPostAction(post));
};
export const likePost = (id, postId) => (dispatch, getState) => {
  let {posts} = getState().posts;
  const index = posts.findIndex(item => {
    return item.postId == postId;
  });
  const likeIndex = posts[index].usersLike.findIndex(item => {
    return item == id;
  });
  if (likeIndex == -1) {
    posts[index].usersLike = [...posts[index].usersLike, id];
  } else {
    posts[index].usersLike.splice(likeIndex, 1);
  }
  dispatch(likePostAction(posts));
};

export const logOut = () => dispatch => {
  dispatch(setLoginFlag(false));
  dispatch(removeUserAction());
};

export const changeUserInfo = (text,userField) => (dispatch,getState)=> {
  let {users, user} = getState().users;
  let newUser = {
    ...user,
    [userField]: text,
  };
  let index = users.findIndex(item => {
    return item.id == user.id;
  });
  if (index != -1) {
    users[index] = newUser;
    dispatch(setUserAction(newUser));
    dispatch(setUsersAction(users));
  } else {
    alert('error');
  }
}

export const addComment = (post, commentText, user, image) => (
  dispatch,
  getState,
) => {
  const {posts} = getState().posts;
  const comment = {
    commentId: ids.generate(),
    commentText: commentText,
    user: user,
    time: new Date(),
    commentImage: image,
  };
  const index = posts.findIndex(item => {
    return item.postId == post.postId;
  });
  posts[index].comments = [...posts[index].comments,comment];
  dispatch(addCommentAction(posts));
};

export function setLanguage(language) {
  return {
    type: types.SET_LANGUAGE,
    language,
  };
}
