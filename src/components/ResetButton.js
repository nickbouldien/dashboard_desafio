import React from 'react';
import PropTypes from 'prop-types';
import { resetState } from '../utils/index';

// need to also refresh page
const ResetButton = () => (
  <div>
    <button onClick={resetState}>
      Reset
    </button>

  </div>
);

export default ResetButton;