// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getWeather } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';
import InputForm from '../components/InputForm';

class Test extends Component {
  constructor() {
    super()
    this.state = {
      wookieFormat: false,
      weather: null,
      data: null
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  // componentDidMount() {
  //   this.fetchWeatherData(false);
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


  render() {
    const { city, weather, error } = this.props;
    console.log(this.props);
    return (
      <div id='test-div'>
        <h1>Test</h1>

        { error && (
          <pre>
            <code>
              { error.toString() }
            </code>
          </pre>)
        }

        <InputForm submitFn={this.fetchWeatherData} type={"text"} />

        {/* <button onClick={this.refresh}>Call Swapi again</button> */}

        { weather && city && <WeatherCard weather={weather} city={city} /> }

        {/* eslint-disable react/jsx-indent */}
      {(
        <div>
          {/* <Image src={`/images/${character}.png`} responsive thumbnail alt={`Image for ${character}`} /> */}

          <h3>Response from swapi for city: {city || 'N/A'} :</h3>
          <pre>
            <code>
              {JSON.stringify(weather, null, 4)}
            </code>
          </pre>

        </div>
      ) || <Spinner1 />
      }

      </div>
    )
  }
}
// optionalObjectWithShape: PropTypes.shape({
//   color: PropTypes.string,
//   fontSize: PropTypes.number
// })

Test.propTypes = {
  weather: PropTypes.object,
  city: PropTypes.string,
  searchTerm: PropTypes.string,
  getWeatherForCity: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

const mapStateToProps = (state, ownProps) => ({
  weather: state.weatherReducer.weather,
  city: state.weatherReducer.weather.city_name,
  error: state.weatherReducer.error,
  searchTerm: state.inputReducer.searchTerm
});

// const mapDispatchToProps = dispatch => {
//     return { listItems: () => { dispatch(listItems()) } }
// }

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query) {
    dispatch(getWeather(query));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
