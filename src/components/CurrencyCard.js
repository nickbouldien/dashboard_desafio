import React from 'react';
import PropTypes from 'prop-types';

const CurrencyCard = ({ currencyData, color }) => (
  <div style={{ backgroundColor: color }}>
    <h3>Currency comparison for: 1 {currencyData.base}</h3>
    {/* use moment.js ou date-fns aqui */}
    <h5>Date: {currencyData.date}</h5>

    <ul>
      {/* could loop through all of the comparisons, but there are about 20... */}
      <li>USD: {currencyData.rates.USD}</li>      
      <li>CAD: {currencyData.rates.CAD}</li>
      <li>BRL: {currencyData.rates.BRL}</li>
      <li>GBP: {currencyData.rates.GBP}</li>
      <li>EUR: {currencyData.rates.EUR}</li>
      <li>AUD: {currencyData.rates.AUD}</li>
    </ul>
  </div>
);

CurrencyCard.propTypes = {
  currencyData: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

export default CurrencyCard;