import * as types from './types';
import ids from 'shortid';
import {AVATAR} from '../constants/img';
import {createAction} from 'redux-actions';
import NavigationService from '../services/NavigationService';
import {AUTH, POSTS} from '../constants/routes';
import axios from 'axios';

const setUserAction = createAction(types.SET_USER);
const setLoginFlag = createAction(types.SET_LOGIN_FLAG);
const sendVoicePostAction = createAction(types.SEND_VOICE_POST);
const sendPostAction = createAction(types.SEND_POST);
const likePostAction = createAction(types.LIKE_POST);
const addCommentAction = createAction(types.ADD_COMMENT);
const removeUserAction = createAction(types.REMOVE_USER);
const setUsersAction = createAction(types.SET_USERS);

export const api = axios.create({
  baseURL: 'https://41363b08.ngrok.io',
  timeout: 15000,
});

export const signUp = (username, email, password, gender) => (dispatch, getState) => {
  api
    .post('/api/user', {
      username: username,
      email: email,
      password: password,
      gender: gender,
      picture : AVATAR
    })
    .then(function(response) {
      if (response.status == 200) {
        const {users} = getState().users;
        dispatch(setUsersAction([...users, response.data]));
        NavigationService.navigate(AUTH, {});
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const signIn = (email, password) => (dispatch, getState) => {
  api
  .post('/api/sign', {
    email: email,
    password: password,
  })
  .then(function(response) {
    const {user} = response.data
    dispatch(setUserAction(user));
    dispatch(setLoginFlag(true));
    NavigationService.navigate(POSTS);
  })
  .catch(function(error) {
    alert("login error")
  });
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
export const likePost = (_id, postId) => (dispatch, getState) => {
  let {posts} = getState().posts;
  const index = posts.findIndex(item => {
    return item.postId == postId;
  });
  const likeIndex = posts[index].usersLike.findIndex(item => {
    return item == _id;
  });
  if (likeIndex == -1) {
    posts[index].usersLike = [...posts[index].usersLike, _id];
  } else {
    posts[index].usersLike.splice(likeIndex, 1);
  }
  dispatch(likePostAction(posts));
};

export const logOut = () => dispatch => {
  dispatch(setLoginFlag(false));
  dispatch(removeUserAction());
};

export const changeUserInfo = (text, userField) => (dispatch, getState) => {
  let {users, user} = getState().users;
  let newUser = {
    ...user,
    [userField]: text,
  };
  let index = users.findIndex(item => {
    return item._id == user._id;
  });
  if (index != -1) {
    users[index] = newUser;
    dispatch(setUserAction(newUser));
    dispatch(setUsersAction(users));
  } else {
    alert('error');
  }
};

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
  posts[index].comments = [...posts[index].comments, comment];
  dispatch(addCommentAction(posts));
};

export function setLanguage(language) {
  return {
    type: types.SET_LANGUAGE,
    language,
  };
}
