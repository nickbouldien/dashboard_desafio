import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { resetState } from '../utils';

// TODO: need to also refresh page when clicked
const ResetButton = () => (
  <Button onClick={resetState}>
    Reset
  </Button>
);

export default ResetButton;