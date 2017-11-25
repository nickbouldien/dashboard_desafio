import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import { move } from '../actions/actionCreators';

const RenderCard = ({ type, data }) => {
  console.log('RenderCard data', data);
  let cardToRender;

  switch(type.toLowerCase()) {
    case 'weather':
      cardToRender = (
        <div>
          <h4>{data.city_name}</h4>
          <p>temp: {data.temp}</p>
          <p>app temp: {data.app_temp}</p>
        </div>
      );
      return cardToRender;
    case 'stock':
      cardToRender = (
        <div>
          <h4>{data.companyName}</h4>
          <p>symbol: {data.symbol}</p>
          <p>Latest Price: {data.latestPrice}</p>
        </div>
      );
      return cardToRender;
    default:
      return null;
  }
  return null;
}

RenderCard.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default RenderCard;
