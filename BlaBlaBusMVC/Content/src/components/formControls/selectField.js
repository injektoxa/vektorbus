import React from 'react';

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
        {children}
      </select>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
)

export default renderSelectField;