import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Input, Button, Dropdown, Icon } from 'antd';
import Spinner1 from '../components/Spinner1';

const InputForm = (props) => [
  <Input
    type={props.inputType}
    onChange={props.handleSearchTermChange}
    value={props.searchTerm}
    placeholder={props.placeholder}
    style={{ width: 200, marginRight: 10, marginLeft: 10 }}
    key={"inputform-input"}
  />,
  <Button type='primary' onClick={props.submitFn} key={"inputform-btn"}>Submit</Button>
];

InputForm.propTypes = {
  inputType: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  handleSearchTermChange: PropTypes.func.isRequired,
  submitFn: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  // error: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.object
  // ])
};

export default InputForm;