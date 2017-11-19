// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getWeather } from '../actions/actionCreators';
import Spinner1 from '../components/Spinner1';
import WeatherCard from '../components/WeatherCard';

class Test extends Component {
  constructor() {
    super()
    this.state = {
      wookieFormat: false,
      weather: null,
      data: null,
      randomNum: 0
    }
    this.onWookieeVersionClick = this.onWookieeVersionClick.bind(this);
    // this.refresh = this.refresh.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  componentDidMount() {
    this.fetchWeatherData(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wookieFormat !== this.state.wookieFormat) {
      this.fetchWeatherData(true); // flips to/from wookie version
    }
  }

  // refresh() {
  //   window.location.reload();
  // }

  fetchWeatherData(changeCity) {

    console.log('the props are: ', this.props);

    let query = `memphis`;
    this.props.getWeatherForCity(query);
    // fetch(`https://www.metaweather.com/api/location/search/?query=${query}`)
    // axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    // .then((res) => {
    //   console.log('ressponse is: ', res);
    //   this.setState({
    //     weather: res.data
    //    });
    // })
    // .catch(function (error) {
    //   console.error(error);
    // });
  }

  onWookieeVersionClick() {
    const currSetting = this.state.wookieFormat;
    this.setState({
      wookieFormat: !currSetting
    });
  }



  render() {
    const { city, weather } = this.props;

    return (
      <div id='test-div'>
        <h1>Test</h1>

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
  getWeatherForCity: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  weather: state.weatherReducer.weather,
  city: state.weatherReducer.weather.city_name
  // locations: state.locations
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
