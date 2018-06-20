import { LOAD_BUSES } from '../constants';

const buses = (state = [], action) => {
  switch (action.type) {
    case LOAD_BUSES:
      return [...action.res];
    default:
      return state;
  }
}

export default buses;