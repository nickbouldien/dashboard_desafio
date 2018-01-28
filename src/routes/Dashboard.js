// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { v4 } from 'node-uuid';
import { Input, Button, Dropdown, Icon, Menu, Divider } from 'antd';
import { getWeather, getStock, getCurrency, attachToLane } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import InputForm from '../components/InputForm';
// import CurrencyCard from '../components/CurrencyCard';
// import StockCard from '../components/StockCard';
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
      placeholder: 'Enter a city'
    }
    this.createUUID = this.createUUID.bind(this)
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.renderInputForm = this.renderInputForm.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.state.submitFuction = this.state.submitFuction.bind(this)
  }

  componentDidMount() {
    // this.fetchCurrency();
  }

  createUUID() {
    return v4();
  }

  fetchCurrency() {
    const currencySymbol = this.props.searchTerm || 'USD';
    const laneId = this.state.lane || 1;
    const cardId = this.createUUID();
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
    // console.log("Dashboard renderInputForm: ", event);

    switch(event.key) { // can extract this elsewhere (make it easier to read here) nb???
      case 'weather':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchWeatherData,
          input: 'text',
          placeholder: 'Enter a city'
        });
      case 'stock':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchStockData,
          input: 'text',
          placeholder: 'Enter a stock symbol'
        });
      case 'other':
        return this.setState({
          inputType: event.key,
          submitFuction: this.testFunction,
          input: 'number',
          placeholder: '0'
        });
      case 'currency':
        return this.setState({
          inputType: event.key,
          submitFuction: this.fetchCurrency,
          input: 'text',
          placeholder: 'Enter a currency'
        });
      default:
        return;
    }
  }

  testFunction() {
    console.log('test function called');
  }

  render() {
    const { /*city,*/ weather, error, stockData, currencyData, lanes } = this.props;
    console.log('Dashboard props: ', this.props);

    // TODO: destructure state to get necessary vars used below

    //  value={this.state.inputType}
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
          {/* <select value={this.state.inputType} name='select' onChange={this.renderInputForm}>
            <option value='weather'>Weather</option>
            <option value='stock'>Stock</option>
            <option value='currency'>Currency</option>
            <option value='other'>Other</option>
          </select> */}
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              Choose type to add <Icon type='down' />
            </Button>
          </Dropdown>

          <InputForm
            submitFn={this.state.submitFuction}
            inputType={this.state.input}
            placeholder={this.state.placeholder}
          />
        </div>

        <Divider />

        <Lanes lanes={lanes} />

      </div>
    )
  }
}
// optionalObjectWithShape: PropTypes.shape({
//   color: PropTypes.string,
//   fontSize: PropTypes.number
// })

Dashboard.propTypes = {
  weather: PropTypes.array,
  // city: PropTypes.string,
  searchTerm: PropTypes.string,
  stockData: PropTypes.object,
  currencyData: PropTypes.object,
  lanes: PropTypes.array,
  getWeatherForCity: PropTypes.func.isRequired,
  getStockInfo: PropTypes.func.isRequired,
  getCurrencyInfo: PropTypes.func.isRequired,
  // attachToLane: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

const mapStateToProps = (state, ownProps) => ({
  weather: state.weather,
  // city: state.weatherReducer.weather.city_name,
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

// export default DragDropContext(HTML5Backend)(Board); // DnD
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// try the below
export default compose(
  DragDropContext(HTML5Backend),
  // connect( ({lanes}) => ({lanes}), {LaneActions} )
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);

// https://github.com/react-dnd/react-dnd/issues/373
// export default compose(
//   DropTarget(dragTypes, storyTarget, collect),
//   connect(mapStateToProps)
// )(StoryEditor);

// export default connect(({lanes}) => ({
//   lanes
// }), {
//   LaneActions
// })(App)




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
