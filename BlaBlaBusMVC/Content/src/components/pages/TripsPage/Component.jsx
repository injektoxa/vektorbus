import React from 'react'
import TripGrid from '../../TripGrid';
import ModalWindow from '../../ModalWindow';
import tripForm from '../../forms/AddTripModal';

export class TripsPage extends React.PureComponent {
  componentWillMount() {
    this.props.getDriversData();
    this.props.getBusesData();
    this.props.getCitiesData();
    this.props.getAgentsData();
    this.props.getClientsData();
  }

  postTrip = (values) => {
    this.props.postTripData(values);
    this.props.toggleDialog();
    if (!this.props.errors) {
      this.props.addToast('Маршрут добавлен', 'success');
      setTimeout(() => this.props.getTripsData(), 4000);
    }
  }

  addRouteClicked = () => {
    this.props.toggleDialog();
  }

  render() {
    console.log('===================');
    return (
      <div>
        <button className='btn btn-primary' onClick={this.addRouteClicked}>Добавить маршрут </button>
        <TripGrid />
        <ModalWindow
          iconName='drive-time'
          title='Добавить маршрут'
          form='add-trip'
          formContent={tripForm}
          onSubmit={this.postTrip}
          bodyProps={{
            buses: this.props.buses,
            drivers: this.props.drivers,
            cities: this.props.cities,
          }}
        />
      </div>
    );
  }
}

export default TripsPage;