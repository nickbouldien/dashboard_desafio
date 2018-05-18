import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';

import { move } from '../actions/actionCreators';

const RenderCard = ({ type, data }) => {
  let cardToRender;

  switch(type.toLowerCase()) {
    case 'weather':
      cardToRender = (
        <Card title={data.city_name} style={{ width: 280 }}>
          <p>temp: {data.temp}</p>
          <p>app temp: {data.app_temp}</p>
        </Card>
      );
      return cardToRender;
    case 'stock':
      cardToRender = (
        <Card title={data.companyName} style={{ width: 280 }}>
          <p>Symbol: {data.symbol}</p>
          <p>Latest Price: {data.latestPrice}</p>
        </Card>
      );
      return cardToRender;
    case 'currency':
      cardToRender = (
        <Card title={data.base} style={{ width: 280 }}>
          <p>Date: {data.date}</p>
          <p>AUD: {data.rates.AUD}</p>
          <p>CAD: {data.rates.CAD}</p>
          <p>BRL: {data.rates.BRL}</p>
          <p>GBP: {data.rates.GBP}</p>
          <p>EUR: {data.rates.EUR}</p>
        </Card>        
      );
      return cardToRender;
    case 'number':
      cardToRender = (
        <div>
          <h4>number card</h4>
        </div>
      );
      return cardToRender;
    default:
      return null;
  }
  // return null;
}

RenderCard.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default RenderCard;
