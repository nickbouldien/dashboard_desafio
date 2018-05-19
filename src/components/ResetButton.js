import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { resetState } from '../utils/index';

// need to also refresh page
const ResetButton = () => (
  <Button onClick={resetState}>
    Reset
  </Button>
);

export default ResetButton;