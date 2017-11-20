// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getWeather, getStock } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import InputForm from '../components/InputForm';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wookieFormat: false,
      weather: null,
      data: null
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.fetchStockData = this.fetchStockData.bind(this);

  }

  // componentDidMount() {
  //   this.fetchStockData();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.wookieFormat !== this.state.wookieFormat) {
  //     this.fetchWeatherData(true); // flips to/from wookie version
  //   }
  // }

  fetchWeatherData(changeCity) {
    // let query = `memphis`;
    const query = this.props.searchTerm;
    // console.log('the props are: ', this.props, 'searchTerm: ', query);
    this.props.getWeatherForCity(query);
  }

  fetchStockData() {
    // let stockQuery = `GOOG`;
    const stock = this.props.searchTerm;
    // console.log('the props are: ', this.props, 'searchTerm: ', query);
    this.props.getStockInfo(stock);
  }


  render() {
    const { city, weather, error } = this.props;
    console.log(this.props);
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

        <InputForm submitFn={this.fetchWeatherData} type={"text"} placeholder={"Enter city"} />
        <br />
        <br />
        <InputForm submitFn={this.fetchStockData} type={"text"} placeholder={"Enter stock symbol"} />

        {/* <button onClick={this.refresh}>Call Swapi again</button> */}

        { weather && city && <WeatherCard weather={weather} city={city} color={'gray'} /> }

        {/* { weather && city && <WeatherCard weather={weather} city={city} color={'lightblue'} /> } */}


        {/* eslint-disable react/jsx-indent */}
      {/* {(
        <div>
          <Image src={`/images/${character}.png`} responsive thumbnail alt={`Image for ${character}`} />

          <h3>Weather for city: {city || 'N/A'} :</h3>
          <pre>
            <code>
              {JSON.stringify(weather, null, 4)}
            </code>
          </pre>

        </div>
      ) || <Spinner1 />
      } */}

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
  city: PropTypes.string,
  searchTerm: PropTypes.string,
  getWeatherForCity: PropTypes.func.isRequired,
  getStockInfo: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

const mapStateToProps = (state, ownProps) => ({
  weather: state.weatherReducer.weather,
  city: state.weatherReducer.weather.city_name,
  stockData: state.stockReducer,
  error: state.weatherReducer.error,
  searchTerm: state.inputReducer.searchTerm
});

// const mapDispatchToProps = dispatch => {
//     return { listItems: () => { dispatch(listItems()) } }
// }

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query) {
    dispatch(getWeather(query));
  },
  getStockInfo(stock) {
    dispatch(getStock(stock));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
