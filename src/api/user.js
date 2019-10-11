import {api} from './index';
import {authorizeApi} from './index';

export const changeUserParams = (userParam, text, token) => {
    authorizeApi(token);
    return api.put('/api/user', {
      [userParam]:  text,
    });
  };