import React from 'react';
import { Field } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
import renderSelectField from '../../formControls/selectField';
import renderDateTimePicker from '../../formControls/dateTimePicker';
import renderInputField from '../../formControls/inputField';

moment.locale('ru');
momentLocalizer(moment);

const required = value => value ? undefined : '* это поле обязательное';

const TripForm = props => {
  return <div>
    <Field name="bus" label="Автобус" component={renderSelectField}>
      <option></option>
      {props.buses.map(i => <option key={i.Id} value={i.Id}>{i.FriendlyName}</option>)}
    </Field>
    <Field name="driver" label="Водитель" component={renderSelectField}>
      <option></option>
      {props.drivers.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
    <Field name="comments" label="Комментарий" component={renderInputField} />
    <label htmlFor="date">Отправление</label>
    <Field
      name="date"
      showTime={true}
      component={renderDateTimePicker}
    />
    <label htmlFor="arrivalDate">Прибытие</label>
    <Field
      name="arrivalDate"
      showTime={true}
      component={renderDateTimePicker}
    />
    <Field name="cityFrom" label="Откуда" validate={required} component={renderSelectField}>
      <option></option>
      {props.cities.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
    <Field name="cityTo" label="Куда" validate={required} component={renderSelectField}>
      <option></option>
      {props.cities.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
  </div >
}

export default TripForm;