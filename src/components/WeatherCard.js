import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = ({ color, city, weather }) => (
  <div style={{ backgroundColor: color }}>
    <h3>Weather for: {city}</h3>
    <ul>
      {/* need to check for units so can display the units correctly after the values */}
      <li>Temp: {weather.temp}</li>
      <li>Apparent Temp: {weather.app_temp} Degrees</li>
      <li>Precipitation: {weather.precip} inches</li>
      <li>Wind Speed: {weather.wind_spd}</li>
      <li>Wind Direction: {weather.wind_dir}</li>
    </ul>
  </div>
);

WeatherCard.propTypes = {
  city: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  weather: PropTypes.object.isRequired,
};

export default WeatherCard;
