import React from 'react';
import { Field } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import renderSelectField from '../../formControls/selectField';
import renderInputField from '../../formControls/inputField';

const required = value => value ? undefined : '* это поле обязательное';
const moreThen0 = value => value < 0 ? '* только положительные числа' : '';
const clientTripForm = props => {
  return <div>
    <Field
      name="ClientId"
      label="Клиент"
      validate={required}
      component={renderSelectField}
    >
      <option></option>
      {props.clients.map(i => <option key={i.Id} value={i.Id}>{`${i.Name} ${i.Phone}`}</option>)}
    </Field>
    <Field
      name="From"
      label="Откуда"
      validate={required}
      component={renderSelectField}
    >
      <option></option>
      {props.cities.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
    <Field
      name="To"
      label="Куда"
      validate={required}
      component={renderSelectField}
    >
      <option></option>
      {props.cities.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
    <Field
      name="Price"
      type="number"
      label="Цена"
      validate={moreThen0}
      component={renderInputField}
      min="1"
    />
    <Field
      name="additionalPrice"
      type="number"
      validate={moreThen0}
      label="Доп. цена"
      component={renderInputField}
      min="1"
    />
    <Field
      name="AgentId"
      label="Агент"
      component={renderSelectField}
    >
      <option></option>
      {props.agents.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
    </Field>
    <Field
      name="AgentPrice"
      validate={moreThen0}
      type="number"
      min="1"
      label="Цена агента"
      component={renderInputField}
    />
    <Field
      name="IsStayInBus"
      type="checkbox"
      label="Не выходит"
      component={renderInputField}
    />
    <Field
      name="HasBaggage"
      type="checkbox"
      label="Багаж"
      component={renderInputField}
    />
  </div >
}

export default clientTripForm;