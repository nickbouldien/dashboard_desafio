import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Input, Button, Dropdown, Icon } from 'antd';
import Spinner1 from '../components/Spinner1';
import { setSearchTerm } from '../actions/actionCreators';

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
  placeholder: PropTypes.string.isRequired
  // error: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.object
  // ])
};

const mapStateToProps = (state, ownProps) => ({
  searchTerm: state.inputReducer.searchTerm,
  // submitFn: ownProps.submitFn,
  // inputType: ownProps.inputType
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
