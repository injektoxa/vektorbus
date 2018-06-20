import { connect } from 'react-redux';
import Component from "./Component";
import withToast from '../../HOCs/withToast';
import flow from 'lodash/flow';
import {
  loadAllTrips,
  postClientTripData,
  toggleDialog,
} from '../../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    getTripsData: () => dispatch(loadAllTrips()),
    postClientTripData: (values) => dispatch(postClientTripData(values)),
    toggleDialog: () => dispatch(toggleDialog('add-client-trip')),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trips: state.trips,
    cities: state.cities,
    agents: state.agents,
    clients: state.clients,
    errors: state.errors,
  }
}

export default flow([
  connect(mapStateToProps, mapDispatchToProps),
  withToast,
])(Component);
