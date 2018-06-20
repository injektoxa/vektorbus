import { POST_CLIENT_TRIP_DATA } from '../constants';

const errors = (state = [], action) => {
  switch (action.type) {
    case POST_CLIENT_TRIP_DATA:
      if (!action.res.errors)
        return state;
      else
        return true;
    default:
      return state;
  }
}

export default errors;
