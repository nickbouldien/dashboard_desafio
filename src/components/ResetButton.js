import React from 'react';
import { Button } from 'antd';
import { resetLocalStorage } from '../utils';

// TODO: need to also refresh page when clicked
const ResetButton = () => (
  <Button onClick={resetLocalStorage}>
    Reset
  </Button>
);

export default ResetButton;
