import { LOAD_ALL_TRIPS } from '../constants';

const trips = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALL_TRIPS:
      return [...action.res];
    default:
      return state;
  }
}

export default trips;