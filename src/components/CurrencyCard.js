import React from 'react';
import PropTypes from 'prop-types';

const CurrencyCard = (props) => (
  <div style={{ backgroundColor: props.color }}>
    <h3>Currency comparison for: 1 {props.currencyData.base}</h3>
    <h5>Date: {props.currencyData.date}</h5> {/* could use moment.js ou similar here... */}

    {/* { console.log('currencyCard props', props) } */}
    <ul>
      {/* could loop through all of the comparisons, but there are about 20... */}
      <li>USD: {props.currencyData.rates.USD}</li>      
      <li>CAD: {props.currencyData.rates.CAD}</li>
      <li>BRL: {props.currencyData.rates.BRL}</li>
      <li>GBP: {props.currencyData.rates.GBP}</li>
      <li>EUR: {props.currencyData.rates.EUR}</li>
      <li>AUD: {props.currencyData.rates.AUD}</li>
    </ul>
  </div>
);

CurrencyCard.propTypes = {
  currencyData: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
};

export default CurrencyCard;
