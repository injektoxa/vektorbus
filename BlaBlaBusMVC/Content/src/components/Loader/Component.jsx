/**
 * Loader Component
 * stretches for full height and width of relative parent and show spinner in the center
 * * */

import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Loader = ({ size, backdrop }) => (<div className={`${backdrop ? 'loader-wrp' : ''}`}>
  <i className={`fa fa-bus fa-spin fa-${size} fa-fw text-info-secondary`} />
  <span className="sr-only">Loading...</span>
</div>);

Loader.propTypes = {
  size: PropTypes.string,
  backdrop: PropTypes.bool,
};
Loader.defaultProps = {
  size: '2x',
  backdrop: true,
};
Loader.displayName = 'Loader';

export default Loader;
