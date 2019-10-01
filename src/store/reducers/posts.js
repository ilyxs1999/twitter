import * as types from '../types';


const initialState = {
  posts: [],
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case types.SEND_POST: {
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    }
    case types.LIKE_POST: {
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
