import Component from './Component';
import { connect } from 'react-redux';
import { deleteClientTrip } from '../../../../actions';
import flow from 'lodash/flow';
import withToast from '../../../../HOCs/withToast';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteClientTrip: (id) => {
      dispatch(deleteClientTrip(id));
    },
  }
}

export default flow([
  connect(null, mapDispatchToProps),
  withToast,
])(Component); 