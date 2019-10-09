import {combineReducers} from 'redux';

import users from './users';
import posts from './posts';
import language from './language'

export default combineReducers({
  users,
  posts,
  language,
});
