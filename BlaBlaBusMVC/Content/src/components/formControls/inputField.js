import React from 'react';

const renderInputField = ({ input, label, min, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} min={min} type={type} />
      {touched && ((error && <span className="error">{error}</span>))}
    </div>
  </div>
)

export default renderInputField;