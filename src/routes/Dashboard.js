// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getWeather, getStock, getCurrency } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import InputForm from '../components/InputForm';
import CurrencyCard from '../components/CurrencyCard';
import StockCard from '../components/StockCard';
import Lanes from '../components/Lanes';
import { ny_weather, goog_stock } from '../mockData';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      data: null,
      inputType: 'weather',
      submitFuction: this.fetchWeatherData,
      input: 'text',
      placeholder: 'Enter a city'
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);
    this.fetchCurrency = this.fetchCurrency.bind(this);
    // this.fetchJoke = this.fetchJoke.bind(this);
    this.renderInputForm = this.renderInputForm.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.state.submitFuction = this.state.submitFuction.bind(this)
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  fetchCurrency() {
    this.props.getCurrencyInfo();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.data !== this.state.data) {
  //     this.fetchWeatherData(true); // flips to/from wookie version
  //   }
  // }

  fetchWeatherData(changeCity) {
    const query = this.props.searchTerm;
    this.props.getWeatherForCity(query);
  }

  fetchStockData() {
    const stock = this.props.searchTerm;
    // this.props.getStockInfo(stock);
  }

  renderInputForm(event) {
    event.preventDefault();
    // console.log('called renderInputForm', event.target, event.target.value);

    switch(event.target.value) {
      case 'weather':
        return this.setState({
          inputType: event.target.value,
          submitFuction: this.fetchWeatherData,
          input: 'text',
          placeholder: 'Enter a city'
        });
      case 'stock':
        return this.setState({
          inputType: event.target.value,
          submitFuction: this.fetchStockData,
          input: 'text',
          placeholder: 'Enter a stock symbol'
        });
      case 'other':
        return this.setState({
          inputType: event.target.value,
          submitFuction: this.testFunction,
          input: 'number',
          placeholder: '0'
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
    console.log('Dashbaord props: ', this.props);
    return (
      <div id='dashboard-div'>
        <h1>Dashboard</h1>

        { error && (
          <pre>
            <code>
              { error.toString() }
            </code>
          </pre>)
        }

        <div>
          <select value={this.state.inputType} name='select' onChange={this.renderInputForm}>
            <option value='weather'>Weather</option>
            <option value='stock'>Stock</option>
            <option value='other'>Other</option>
          </select>
          <InputForm
            submitFn={this.state.submitFuction}
            inputType={this.state.input}
            placeholder={this.state.placeholder}
          />
        </div>

        <Lanes lanes={lanes} />

        {/* <InputForm submitFn={this.fetchWeatherData} inputType={"text"} placeholder={"Enter city"} />
        <br />
        <br />
        <InputForm submitFn={this.fetchStockData} inputType={"text"} placeholder={"Enter stock symbol"} /> */}

        {/* { weather && city && <WeatherCard weather={weather} city={city} color={'gray'} /> } */}

        {/* w/ mock data */}
        {/* <WeatherCard weather={ny_weather} city={ny_weather.city_name} color={'lightgray'} /> */}


        {/* { stockData && ( Object.keys(stockData.stock).length > 0 ) && <StockCard stock={stockData.stock} color={'lightblue'} /> } */}

        {/* <StockCard stock={goog_stock} color={'salmon'} /> */}

        {/* { currencyData && ( Object.keys(currencyData.currency).length > 0 ) && <CurrencyCard currencyData={currencyData.currency} color={'green'} /> } */}


      </div>
    )
  }
}
// optionalObjectWithShape: PropTypes.shape({
//   color: PropTypes.string,
//   fontSize: PropTypes.number
// })

Dashboard.propTypes = {
  weather: PropTypes.object,
  // city: PropTypes.string,
  searchTerm: PropTypes.string,
  stockData: PropTypes.object,
  currencyData: PropTypes.object,
  lanes: PropTypes.array,
  getWeatherForCity: PropTypes.func.isRequired,
  getStockInfo: PropTypes.func.isRequired,
  getCurrencyInfo: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

const mapStateToProps = (state, ownProps) => ({
  weather: state.weatherReducer.weather,
  // city: state.weatherReducer.weather.city_name,
  stockData: state.stockReducer,
  currencyData: state.currencyReducer,
  error: state.weatherReducer.error,
  searchTerm: state.inputReducer.searchTerm,
  lanes: state.laneReducer
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query) {
    dispatch(getWeather(query));
  },
  getStockInfo(stock) {
    dispatch(getStock(stock));
  },
  getCurrencyInfo(currencySymbol) {
    dispatch(getCurrency(currencySymbol));
  }
});

// export default DragDropContext(HTML5Backend)(Board); // DnD
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// try the below
export default compose(
  DragDropContext(HTML5Backend),
  // connect( ({lanes}) => ({lanes}), {LaneActions} )
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)

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
