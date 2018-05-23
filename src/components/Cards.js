import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardContainer from '../containers/CardContainer';
import { move } from '../actions/actionCreators';

const Cards = ({ cards, move, onDelete }) => (
  <div className='cards'>
    {
      cards.map((card) =>
        <CardContainer
          className='card'
          id={card.id}
          key={card.id}
          onMove={move}
          cardData={card}
          onDelete={onDelete.bind(null, card.id)} /* eslint react/jsx-no-bind: 0 */
        />
      )}
  </div>
);

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  // onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
};

export default connect(() => ({}), {
  move
})(Cards);
