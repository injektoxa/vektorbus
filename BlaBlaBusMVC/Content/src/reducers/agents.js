import { LOAD_AGENTS } from '../constants';

const agents = (state = [], action) => {
  switch (action.type) {
    case LOAD_AGENTS:
      return [...action.res];
    default:
      return state;
  }
}

export default agents;