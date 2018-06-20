
import trips from './trips';
import drivers from './drivers';
import buses from './buses';
import modal from './modal';
import cities from './cities';
import agents from './agents';
import clients from './clients';
import errors from './errors';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  clients,
  errors,
  modal,
  trips,
  cities,
  buses,
  drivers,
  agents,
  form: formReducer
})