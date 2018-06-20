import { LOAD_CLIENTS } from '../constants';

const clients = (state = [], action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      return [...action.res];
    default:
      return state;
  }
}

export default clients;