import React, { Component } from 'react';
import { Position, Toaster } from '@blueprintjs/core';

const toastOptions = {
  error: {
    className: 'pt-intent-danger',
    iconName: 'pt-icon-error',
  },
  success: {
    className: 'pt-intent-success',
    iconName: 'pt-icon-tick',
  },
};

const toaster = Toaster.create({
  position: Position.TOP,
});

const withToast = WrappedComponent =>
  class extends Component {

    getInnerOptions = type => toastOptions[type] || toastOptions.default;

    addToast = (message, type, options) =>
      toaster.show({
        message,
        ...this.getInnerOptions(type),
        ...options,
      });

    render() {
      return (
        <WrappedComponent
          {...this.props}
          addToast={this.addToast}
        />
      );
    }
  };

export default withToast;
