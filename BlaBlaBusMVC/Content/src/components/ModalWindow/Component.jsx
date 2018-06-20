import React from 'react';
import { Dialog } from '@blueprintjs/core';
import '@blueprintjs/core/dist/blueprint.css';
import ModalForm from './ModalForm';

const ModalWindow = props => {
  const onClose = () => {
    props.onCloseHandler(props.form);
  };
  const { isOpen, title, iconName } = props;
  return (
    <div>
      <Dialog iconName={iconName} title={title} isOpen={isOpen} onClose={onClose}>
        <div className="pt-dialog-body">
          {isOpen && <ModalForm {...props} onClose={onClose} />}
        </div>
      </Dialog>
    </div>
  )
}

export default ModalWindow;