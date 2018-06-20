import { LOAD_CITIES } from '../constants';

const cities = (state = [], action) => {
  switch (action.type) {
    case LOAD_CITIES:
      return [...action.res];
    default:
      return state;
  }
}

export default cities;