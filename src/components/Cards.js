import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from './Card';
import { move } from '../actions/actionCreators';

const Cards = ({ cards, move /*, onValueClick, onDelete*/ }) => (
  <div className='cards'>{cards.map((card) =>
    <Card
      className='card'
      id={card.id}
      key={card.id}
      onMove={move}
      cardData={card}
    />
    )}
  </div>
);

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  // onValueClick: PropTypes.func,
  // onDelete: PropTypes.func,
};

export default connect(() => ({}), {
  move
})(Cards);
