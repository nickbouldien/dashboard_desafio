import React from 'react';
import PropTypes from 'prop-types';
import {  Button, Input } from 'antd';

const InputForm = (props) => [
  <Input
    type={props.inputType}
    onChange={props.handleSearchTermChange}
    value={props.searchTerm}
    placeholder={props.placeholder}
    style={{ width: 200, marginRight: 10, marginLeft: 10 }}
    key={"inputform-input"}
  />,
  <Button
    type='primary'
    onClick={props.submitFn}
    key={"inputform-btn"}
  >
    Submit
  </Button>
];

InputForm.propTypes = {
  inputType: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  handleSearchTermChange: PropTypes.func.isRequired,
  submitFn: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputForm;
