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
  switch (action.type) {
    case types.SIGN_UP: {
      return {
        ...state,
        user: action.newUser,
        users: state.users.concat(action.newUser),
      };
    }
    case types.SIGN_IN: {
      const email = action.email;
      const password = action.password;
      const users = state.users;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password)
          return {...state, user: users[i], loginIn: true};
      }
    }
    case types.SET_AVATAR: {
      let list = state.users;
      let user = {
        ...state.user,
        avatarUri: action.avatarUri,
      };
      let newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.avatarUri = action.avatarUri;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    }
    case types.LOG_OUT: {
      return {
        ...state,
        loginIn: false,
      };
    }
    case types.CHANGE_USERNAME: {
      let list = state.users;
      let user = {
        ...state.user,
        username: action.username,
      };
      let newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.username = action.username;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    }
    case types.CHANGE_PASSWORD: {
      let list = state.users;
      let user = {
        ...state.user,
        password: action.password,
      };
      let newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.password = action.password;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    }
    case types.CHANGE_EMAIL: {
      let list = state.users;
      let user = {
        ...state.user,
        email: action.email,
      };
      let newUsers = list.map(function(user) {
        if (user.email == state.user.email) user.email = action.email;
        return user;
      });
      return {
        ...state,
        users: newUsers,
        user: user,
      };
    }

    default:
      return state;
  }
}
