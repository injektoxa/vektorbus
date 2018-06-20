import { toggleDialog } from '../../actions';
import { getDialogWindowState } from '../../reducers/modal';
import { connect } from 'react-redux';
import Component from './Component';

export const mapStateToProps = (state, ownProps) => ({
  isOpen: getDialogWindowState(state, ownProps),
});

export const mapDispatchToProps = (dispatch) => ({
  onCloseHandler: (formId) => {
    dispatch(toggleDialog(formId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

