import * as types from '../types';
import * as IMAGES from '../../constants/img';
const initialState = {
  loginIn: false,
  users: [],
  user: {
    id: null,
    username: null,
    email: null,
    password: null,
    avatarUri: null,
  },
};
export default function users(state = initialState, action) {
  let list, user, newUsers;
  switch (action.type) {
    case types.SIGN_UP:
      const newId = state.users.length + 1;
      const newUser = {
        id: newId,
        username: action.username,
        email: action.email,
        password: action.password,
        avatarUri: IMAGES.AVATAR,
      };
      return {
        ...state,
        user: newUser,
        users: state.users.concat(newUser),
      };

    case types.SIGN_IN:
      const email = action.email;
      const password = action.password;
      const users = state.users;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password)
          return {...state, user: users[i], loginIn: true};
      }
    case types.SET_AVATAR:
      list = state.users;
      user = {
        ...state.user,
        avatarUri: action.avatarUri,
      };
      newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.avatarUri = action.avatarUri;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    case types.LOG_OUT:
      return {
        ...state,
        loginIn: false,
      };
    case types.CHANGE_USERNAME:
      list = state.users;
      user = {
        ...state.user,
        username: action.username,
      };
      newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.username = action.username;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    case types.CHANGE_PASSWORD:
      list = state.users;
      user = {
        ...state.user,
        password: action.password,
      };
      newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.password = action.password;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    case types.CHANGE_EMAIL:
      list = state.users;
      user = {
        ...state.user,
        email: action.email,
      };
      newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.email = action.email;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };

    default:
      return state;
  }
}
