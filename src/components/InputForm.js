import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner1 from '../components/Spinner1';
import { setSearchTerm } from '../actions/actionCreators';

const InputForm = (props) => {

  console.log('inputform props: ', props);

  return (
    <div className='input-form-div' style={{ background: "gray" }}>
      <input
        type={props.inputType}
        onChange={props.handleSearchTermChange}
        value={props.searchTerm}
        placeholder={props.placeholder}
      />
      <br />
      <button onClick={props.submitFn}>Submit</button>

    </div>
  )
}

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
