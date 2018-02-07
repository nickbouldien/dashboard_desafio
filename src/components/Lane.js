import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Cards from './Cards';
import ItemTypes from '../constants/itemTypes';
import { detachFromLane, attachToLane /*, move*/ } from '../actions/actionCreators';

const cardTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    throttle(() => {
      console.log('cardTarget in Lane ', targetProps, 't/f: ', !targetProps.lane.cards.length,
          !targetProps.laneCards.length, 'sourceId: ', sourceId)}
          , 1200);

    if(!targetProps.lane.cards.length) {
      targetProps.attachToLane(
        targetProps.lane.id,
        sourceId
      );
    }
  }
};
class Lane extends Component {
  deleteCard(laneId, cardId, e) {
    e.stopPropagation();
  }
  render() {
    const { connectDropTarget, lane, laneCards, className } = this.props;
    const laneId = lane.id;

    return connectDropTarget(
      <div className={className}>
        <div className='lane-header'>
          <h4>{lane.name}</h4>
        </div>
        <Cards
          cards={laneCards}
          onDelete={(id, e) => this.deleteCard(laneId, id, e)}
        />
      </div>
    );
  }
}

Lane.propTypes = {
  connectDropTarget: PropTypes.func,
  lane: PropTypes.object,
  laneCards: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  let laneCards = [];
  const weatherCards = ownProps.lane.cards
    .map(id => state.weather[
      state.weather.findIndex(card => card.id === id)
    ]).filter(card => card);

  const stockCards = ownProps.lane.cards
    .map(id => state.stocks[
      state.stocks.findIndex(card => card.id === id)
    ]).filter(card => card);

  const currencyCards = ownProps.lane.cards
    .map(id => state.currencies[
      state.currencies.findIndex(card => card.id === id)
    ]).filter(card => card);

  // FIXME: need to fix this (todo.txt bug - can't put card where you want to )
  laneCards = [...weatherCards, ...stockCards, ...currencyCards];

  // return concatenated laneCards that contains all (weather/stock) data for cards
  return { laneCards: laneCards }
}

// ({
//   laneCards: ownProps.lane.cards
//     .map(id => state.weather[
//       state.weather.findIndex(card => card.id === id)
//     ]).filter(card => card)
// });

const mapDispatchToProps = (dispatch) => ({
  attachToLane(targetPropsLaneId, sourceId) {
    dispatch(attachToLane(targetPropsLaneId, sourceId));
  },
  detachFromLane(laneId, cardId) {
    dispatch(detachFromLane(laneId, cardId));
  }
});

export default compose(
  connect((state, ownProps) => mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
