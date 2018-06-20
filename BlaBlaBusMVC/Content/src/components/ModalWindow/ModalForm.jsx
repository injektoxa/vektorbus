import React from 'react';
import { Form } from 'redux-form';
import connectForm from '../../HOCs/withForm';

const ModalForm = props => {
  const { formContent, handleSubmit, onClose, bodyProps } = props;
  const { Body } = formContent;
  return <Form onSubmit={handleSubmit} noValidate>
    <div className="pt-dialog-body">
      {<Body {...bodyProps}/>}
    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions btns-wrp">
        <button className="btn btn-default" type="submit">Сохранить</button>
        <button type="button" className="btn btn-default" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  </Form>;
};

export default connectForm()(ModalForm);
