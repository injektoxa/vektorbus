import { connect } from 'react-redux';
import Component from "./Component";
import withToast from '../../../HOCs/withToast';
import flow from 'lodash/flow';
import {
  loadAllTrips,
  getDriversData,
  getBusesData,
  getCitiesData,
  getAgentsData,
  toggleDialog,
  postTripData,
  getClientsData,
} from '../../../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    getTripsData: () => dispatch(loadAllTrips()),
    getDriversData: () => dispatch(getDriversData()),
    getBusesData: () => dispatch(getBusesData()),
    getCitiesData: () => dispatch(getCitiesData()),
    getAgentsData: () => dispatch(getAgentsData()),
    getClientsData: () => dispatch(getClientsData()),
    toggleDialog: () => dispatch(toggleDialog('add-trip')),
    postTripData: (values) => dispatch(postTripData(values)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trips: state.trips,
    drivers: state.drivers,
    buses: state.buses,
    cities: state.cities,
  }
}

export default flow([
  withToast,
  connect(mapStateToProps, mapDispatchToProps),
])(Component)
