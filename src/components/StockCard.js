import React from 'react';
import PropTypes from 'prop-types';

const StockCard = ({ stock, color }) => (
  <div style={{ backgroundColor: color }}>
    <h3>Stock Data for: {stock.symbol}, {stock.companyName}</h3>
    <h5>Latest Time: {stock.latestTime}</h5>

    <ul>
      {/* could loop through all of the comparisons, but there are about 20... */}
      <li>Price ($): {stock.latestPrice}</li>
      <li>Change ($): {stock.change}</li>
      <li>marketCap ($): {stock.marketCap}</li>
      <li>Avg. total volume: {stock.avgTotalVolume}</li>
      <li>week52High: {stock.week52High}</li>
      <li>week52Low: {stock.week52Low}</li>
      <li>ytdChange (%): {stock.ytdChange}</li>
      <li>Sector: {stock.sector}</li>
    </ul>
  </div>
);

StockCard.propTypes = {
  color: PropTypes.string.isRequired,
  stock: PropTypes.object.isRequired,
};

export default StockCard;
