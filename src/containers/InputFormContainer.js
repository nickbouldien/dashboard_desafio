import { connect } from 'react-redux';
import { setSearchTerm } from '../actions/actionCreators';
import InputForm from '../components/InputForm';

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

const InputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

export default InputFormContainer;