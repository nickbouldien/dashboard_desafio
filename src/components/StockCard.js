import React from 'react';
import PropTypes from 'prop-types';

const StockCard = (props) => (
  <div style={{ backgroundColor: props.color }}>
    <h3>Stock Data for: {props.stock.symbol}, {props.stock.companyName}</h3>
    <h5>Latest Time: {props.stock.latestTime}</h5>

    { console.log('stockCard props', props) }
    <ul>
      {/* could loop through all of the comparisons, but there are about 20... */}
      <li>Price ($): {props.stock.latestPrice}</li>
      <li>Change ($): {props.stock.change}</li>
      <li>marketCap ($): {props.stock.marketCap}</li>
      <li>Avg. total volume: {props.stock.avgTotalVolume}</li>

      <li>week52High: {props.stock.week52High}</li>
      <li>week52Low: {props.stock.week52Low}</li>
      <li>ytdChange (%): {props.stock.ytdChange}</li>

      <li>Sector: {props.stock.sector}</li>

    </ul>
  </div>
);

StockCard.propTypes = {
  stock: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
};

export default StockCard;
