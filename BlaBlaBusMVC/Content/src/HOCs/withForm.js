import { reduxForm } from 'redux-form';

const defaults = {
  enableReinitialize: true,
};

export default (options = {}) => {
  return reduxForm(Object.assign({}, defaults, options));
};