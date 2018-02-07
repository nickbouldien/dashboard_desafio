import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = (props) => (
  <div style={{ backgroundColor: props.color }}>
    <h3>Weather for: {props.city}</h3>
    <ul>
      {/* need to check for units so can display the units correctly after the values */}
      <li>Temp: {props.weather.temp}</li>
      <li>Apparent Temp: {props.weather.app_temp} Degrees</li>
      <li>Precipitation: {props.weather.precip} inches</li>
      <li>Wind Speed: {props.weather.wind_spd}</li>
      <li>Wind Direction: {props.weather.wind_dir}</li>

    </ul>
  </div>
);

WeatherCard.propTypes = {
  weather: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default WeatherCard;
