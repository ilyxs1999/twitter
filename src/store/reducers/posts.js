import * as types from '../types';

const initialState = {
  posts: [],
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case types.SEND_POST: {
      const newId = state.posts.length + 1;
      const post = {
        postId: newId,
        user: action.user,
        postText: action.postText,
        time: new Date(),
        usersLike: [],
        image: action.image,
        comments: [],
      };
      return {
        ...state,
        posts: [...state.posts, post],
      };
    }
    case types.LIKE_POST: {
    }
    case types.ADD_COMMENT: {
      let commentId = 1;
      let posts = [...state.posts];
      const index = posts.findIndex(item => {
        return item.postId == action.post.postId;
      });
      if (state.posts[index].comments)
        commentId = state.posts[index].comments.length + 1;
      const comment = {
        commentId: commentId,
        commentText: action.commentText,
        user: action.user,
        time: new Date(),
        commentImage: action.image,
      };

      posts[index].comments = posts[index].comments.concat(comment);

      return {
        ...state,
        posts: posts,
      };
    }
    default:
      return state;
  }
}
