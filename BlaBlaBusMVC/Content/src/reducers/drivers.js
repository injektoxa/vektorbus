import { LOAD_DRIVERS } from '../constants';

const drivers = (state = [], action) => {
  switch (action.type) {
    case LOAD_DRIVERS:
      return [...action.res];
    default:
      return state;
  }
}

export default drivers;