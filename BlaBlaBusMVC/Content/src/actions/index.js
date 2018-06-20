import {
  LOAD_ALL_TRIPS,
  LOAD_DRIVERS,
  LOAD_BUSES,
  LOAD_CITIES,
  POST_TRIP_DATA,
  TOGGLE_DIALOG,
  LOAD_AGENTS,
  LOAD_CLIENTS,
  POST_CLIENT_TRIP_DATA,
  DELETE_CLIENT_TRIP_DATA,
  SUCCESS,
  FAIL,
} from '../constants';

export const loadAllTrips = () => {
  return {
    type: LOAD_ALL_TRIPS,
    callApi: '/api/trips',
  }
}

export const getDriversData = () => {
  return {
    type: LOAD_DRIVERS,
    callApi: '/api/drivers',
  }
}

export const getBusesData = () => {
  return {
    type: LOAD_BUSES,
    callApi: '/api/buses',
  }
}

export const getAgentsData = () => {
  return {
    type: LOAD_AGENTS,
    callApi: '/api/agents',
  }
}

export const getCitiesData = () => {
  return {
    type: LOAD_CITIES,
    callApi: '/api/cities',
  }
}

export const postTripData = (values) => {
  return {
    type: POST_TRIP_DATA,
    callApi: '/api/trips',
    data: values,
    method: 'POST',
  }
}

export const postClientTripData = (values) => {
  return (dispatch) => {
    fetch('/api/clienttrips', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    })
      .then(res => {
        if (!res.ok) {
          console.log('Looks like there was a problem. Status Code: ' + res.status);
          throw Error(res.statusText);
        }
        return res => res.json();
      })
      .then(res => dispatch({
        type: POST_CLIENT_TRIP_DATA + SUCCESS,
      }))
      .catch(error => dispatch({
        type: POST_CLIENT_TRIP_DATA + FAIL,
        payload: { error },
      }));
  }
}

// export const postClientTripData = (values) => {
//   return {
//     type: POST_CLIENT_TRIP_DATA,
//     callApi: 'api/clienttrips',
//     data: values,
//     method: 'POST',
//   }
// }

export const deleteClientTrip = (id) => {
  return {
    type: DELETE_CLIENT_TRIP_DATA,
    callApi: '/api/clienttrips',
    data: id,
    method: 'DELETE',
  }
}

export const toggleDialog = (modalId) => {
  return {
    type: TOGGLE_DIALOG,
    id: modalId,
  }
}

export const getClientsData = () => {
  return {
    type: LOAD_CLIENTS,
    callApi: '/api/clients',
  }
}
