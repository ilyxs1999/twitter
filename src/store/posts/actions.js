import {SEND_VOICE_POST,SEND_POST,LIKE_POST,ADD_COMMENT}  from './types';
import ids from 'shortid';
import {createAction} from 'redux-actions';


const sendVoicePostAction = createAction(SEND_VOICE_POST);
const sendPostAction = createAction(SEND_POST);
const likePostAction = createAction(LIKE_POST);
const addCommentAction = createAction(ADD_COMMENT);

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

export const sendPost = (user, postText, image, location) => (
  dispatch,
  getState,
) => {
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
