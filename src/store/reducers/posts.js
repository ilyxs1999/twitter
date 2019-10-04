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
        posts: [action.post, ...state.posts],
      };
    }
    case types.SEND_VOICE_POST: {
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };
    }
    case types.LIKE_POST: {
      let posts = [...state.posts];
      const index = posts.findIndex(item => {
        return item.postId == action.postId;
      });
      const likeIndex = posts[index].usersLike.findIndex(item => {
        return item == action.id;
      });
      if (likeIndex == -1) {
        posts[index].usersLike = posts[index].usersLike.concat(action.id);
      } else {
         posts[index].usersLike.splice(likeIndex, 1);
      }
      return {
        ...state,
        posts: posts,
      };
    }
    case types.ADD_COMMENT: {
      let posts = [...state.posts];
      const index = posts.findIndex(item => {
        return item.postId == action.post.postId;
      });
      posts[index].comments = posts[index].comments.concat(action.comment);
      return {
        ...state,
        posts: posts,
      };
    }
    default:
      return state;
  }
}
