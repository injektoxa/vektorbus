import { TOGGLE_DIALOG } from '../constants';

const modal = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return Object.assign({}, state, { [action.id]: !state[action.id] });
    default:
      return state;
  }
}

export const getDialogWindowState = (state, { form }) => {
  return state.modal[form];
}

export default modal;