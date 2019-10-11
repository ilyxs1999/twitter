import {api} from './index';
import {authorizeApi} from './index';

export const register = (username, email, password, gender, picture) => {
 return  api.post('/sign', {
    username,
    email,
    password,
    gender,
    picture,
  });
};
export const login = (email, password) =>
  api.post('/login', {
    email,
    password,
  });

export const logout = token => {
  authorizeApi(token);
  return api.delete('/api/user/');
};
