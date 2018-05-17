// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Input, Button, Dropdown, Icon, Menu, Divider } from 'antd';
import { createUUID } from '../utils';
import { getWeather, getStock, getCurrency, attachToLane } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import InputForm from '../components/InputForm';
import Lanes from '../components/Lanes';
import { ny_weather, goog_stock } from '../mockData';

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
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.renderInputForm = this.renderInputForm.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.state.submitFuction = this.state.submitFuction.bind(this);
  }

  componentDidMount() {
    // this.fetchCurrency();
  }

  fetchCurrency() {
    const currencySymbol = this.props.searchTerm || 'USD';
    const laneId = this.state.lane || 1;
    const cardId = createUUID();
    const type = "currency";
    this.props.getCurrencyInfo(currencySymbol, laneId, cardId, type);
  }

  fetchWeatherData() {
    const query = this.props.searchTerm;
    if (query === "") { return; }
    const units = "I";
    const laneId = this.state.lane || 1;
    const cardId = this.createUUID();
    const type = "weather";
    this.props.getWeatherForCity(query, units, laneId, cardId, type);
  }

  fetchStockData() {
    const stock = this.props.searchTerm;
    if (stock === "") { return; }
    const laneId = this.state.lane || 1;
    const cardId = this.createUUID();
    const type = "stock";
    this.props.getStockInfo(stock, laneId, cardId, type);
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
      case 'other':
        return this.setState({
          inputType: event.key,
          submitFuction: this.testFunction,
          input: 'number',
          placeholder: '0',
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

  testFunction() {
    console.log('test function called');
  }

  render() {
    const { weather, error, stockData, currencyData, lanes } = this.props;
    const { input, submitFuction, placeholder } = this.state;

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

        { error && (
          <pre>
            <code>
              { error.toString() }
            </code>
          </pre>
          )
        }

        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              Choose type to add <Icon type='down' />
            </Button>
          </Dropdown>

          <InputForm
            submitFn={submitFuction}
            inputType={input}
            placeholder={placeholder}
          />
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

const mapStateToProps = (state, ownProps) => ({
  weather: state.weather,
  stockData: state.stockReducer,
  currencyData: state.currencyReducer,
  error: state.weather.error,
  searchTerm: state.inputReducer.searchTerm,
  lanes: state.laneReducer
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query, units, laneId, cardId, type) {
    dispatch(getWeather(query, units, laneId, cardId, type));
  },
  getStockInfo(stock, laneId, cardId, type) {
    dispatch(getStock(stock, laneId, cardId, type));
  },
  getCurrencyInfo(currencySymbol, laneId, cardId, type) {
    dispatch(getCurrency(currencySymbol, laneId, cardId, type));
  },
  attachToLane(targetPropsLaneId, sourceId) {
    dispatch(attachToLane(targetPropsLaneId, sourceId));
  },
});


export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);



// https://github.com/react-dnd/react-dnd/issues/373
// export default compose(
//   DropTarget(dragTypes, storyTarget, collect),
//   connect(mapStateToProps)
// )(StoryEditor);



// const mapStateToProps = ({ reducer1, reducer2}) =>
//     ({reducer1, reducer2 });

// const mapDispatchToProps = dispatch => {
//     return { listItems: () => { dispatch(listItems()) } }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       todoActions: bindActionCreators(todoActions, dispatch),
//       counterActions: bindActionCreators(counterActions, dispatch)
//     }
//   };
// }


// function mapDispatchToProps(dispatch) {
//     return {
//         userPositionActions : bindActionCreators(userPositionActions, dispatch),
//         jobTitleSkillsActions: bindActionCreators(jobTitleSkillsActions, dispatch),
//     }
// }
