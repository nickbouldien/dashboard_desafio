import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Input, Button, Dropdown, Icon, Menu, Divider } from 'antd';
import { createUUID } from '../utils';
import InputFormContainer from '../containers/InputFormContainer';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import Lanes from '../components/Lanes';
import ResetButton from '../components/ResetButton';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lane: 1,
      weather: null,
      inputType: 'weather',
      submitFuction: this.fetchWeatherData,
      input: 'text',
      placeholder: 'Enter a city',
      err: '',
      // applicationError: '',
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.renderInputForm = this.renderInputForm.bind(this);
    this.state.submitFuction = this.state.submitFuction.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  // componentDidMount() {
  //   this.fetchCurrency();
  // }

  fetchCurrency() {
    this.removeError();
    const currencySymbol = this.props.searchTerm || 'USD';
    const laneId = this.state.lane || 1;
    const cardId = createUUID();
    const type = "currency";
    this.props.getCurrencyInfo(currencySymbol, laneId, cardId, type);
  }

  fetchWeatherData() {
    this.removeError();
    const query = this.props.searchTerm;
    if (query === "") { 
      this.addError("You must enter a city.");  
      return;
    }
    const units = "I";
    const laneId = this.state.lane || 1;
    const cardId = createUUID();
    const type = "weather";
    this.props.getWeatherForCity(query, units, laneId, cardId, type);
  }

  fetchStockData() {
    this.removeError();
    const stock = this.props.searchTerm;
    if (stock === "") { 
      this.addError("You must enter a stock.");  
      return;
    }
    const laneId = this.state.lane || 1;
    const cardId = createUUID();
    const type = "stock";
    this.props.getStockInfo(stock, laneId, cardId, type);
  }

  addError(message) {
    this.setState({
      err: message,
    });
  }

  removeError() {
    this.setState({
      err: '',
    });
  }

  renderInputForm(event) {
    switch(event.key) { // can extract this elsewhere (make it easier to read here) nb???
      case 'weather':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchWeatherData,
          input: 'text',
          placeholder: 'Enter a city',
        });
      case 'stock':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchStockData,
          input: 'text',
          placeholder: 'Enter a stock symbol',
        });
      case 'currency':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchCurrency,
          input: 'text',
          placeholder: 'Enter a currency',
        });
      default:
        return;
    }
  }

  render() {
    const { weather, error, stockData, currencyData, lanes } = this.props;
    const { input, submitFuction, placeholder, err } = this.state;

    console.log('error: ', error);
    const displayError = typeof error === "object" ? error && error.newError && error.newError.message : error;
    console.log('displayError: ', displayError);
    
    const menu = (
      <Menu onClick={this.renderInputForm}>
        <Menu.Item key='weather'>Weather</Menu.Item>
        <Menu.Item key='stock'>Stock</Menu.Item>
        <Menu.Item key='currency'>Currency</Menu.Item>
      </Menu>
    );

    return (
      <div id='dashboard-div'>

        <Divider />

        <h3>Welcome to your dashboard</h3>

        { error || err ? (
          <pre>
            <code style={{ color: 'red' }}>
              { error ? displayError : err.toString() }
            </code>
          </pre>
          ) : null
        }

        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              Choose type to add <Icon type='down' />
            </Button>
          </Dropdown>

          <InputFormContainer
            submitFn={submitFuction}
            inputType={input}
            placeholder={placeholder}
          />

          <ResetButton />

        </div>

        <Divider />

        <Lanes lanes={lanes} />

      </div>
    )
  }
}

Dashboard.propTypes = {
  weather: PropTypes.array,
  searchTerm: PropTypes.string,
  stockData: PropTypes.object,
  currencyData: PropTypes.object,
  lanes: PropTypes.array,
  getWeatherForCity: PropTypes.func.isRequired,
  getStockInfo: PropTypes.func.isRequired,
  getCurrencyInfo: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
};

export default Dashboard;