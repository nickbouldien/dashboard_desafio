// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import Spinner1 from '../components/Spinner1';
import { getWeather } from '../actions/actionCreators';

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
    this.callSwapi = this.callSwapi.bind(this);
  }

  componentDidMount() {
    this.callSwapi(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wookieFormat !== this.state.wookieFormat) {
      this.callSwapi(true); // flips to/from wookie version
    }
  }

  // refresh() {
  //   window.location.reload();
  // }

  callSwapi(changeCity) {

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
    let character = ""; // this.state.data && (this.state.data.name || this.state.data.whrascwo);
    const { data } = this.state;


    return (
      <div id='test-div'>
        <h1>Test</h1>

        {/* <button onClick={this.refresh}>Call Swapi again</button> */}


        {/* eslint-disable react/jsx-indent */}
      {(
        <div>
          {/* <Image src={`/images/${character}.png`} responsive thumbnail alt={`Image for ${character}`} /> */}

          <h3>Response from swapi for city: {this.props.city || 'N/A'} :</h3>
          <pre>
              <code>
                {JSON.stringify(this.props.weather, null, 4)}
              </code>
            </pre>

        </div>
      ) || <Spinner1 />
      }

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  weather: state.weatherReducer.weather,
  city: state.weatherReducer.weather.city_name
  // locations: state.locations
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query) {
    dispatch(getWeather(query));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
