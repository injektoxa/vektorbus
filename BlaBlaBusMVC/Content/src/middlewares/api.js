import { SUCCESS, FAIL, START } from '../constants';

export default store => next => action => {
  const { callApi, method, type, data, ...rest } = action;
  if (!callApi) {
    return next(action);
  }

  next({
    ...rest, type: type + START,
  })

  if (method === 'DELETE') {
    fetch(callApi + '/' + data, {
      method: 'DELETE',
    })
      .then(res => next({ ...action, res }))
  } else if (method === 'POST') {
    fetch(callApi, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (!res.ok) {
          console.log('Looks like there was a problem. Status Code: ' + res.status);
          throw Error(res.statusText);
        }
        return res => res.json();
      })
      .then(res => next({ ...action, res, type: `${type}${SUCCESS}` }))
      .catch(e => {
        console.log('!!!!!!!', e);
        return next({ ...action, type: `${type}${FAIL}`, e })
      })
  } else {
    fetch(callApi)
      .then(res => res.json())
      .then(res => next({ ...action, res }))
  }
}
