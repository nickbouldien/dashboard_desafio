import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import throttle from 'lodash/throttle';
import ItemTypes from '../constants/itemTypes';
import Lane from '../components/Lane';
import { detachFromLane, attachToLane } from '../actions/actionCreators';

const cardTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    throttle(() => {
      if(!targetProps.lane.cards.length) {
        targetProps.attachToLane(
          targetProps.lane.id,
          sourceId,
        );
      }
    })
  }
};

const mapDispatchToProps = (dispatch) => ({
  attachToLane(targetPropsLaneId, sourceId) {
    dispatch(attachToLane(targetPropsLaneId, sourceId));
  },
  detachFromLane(laneId, cardId) {
    dispatch(detachFromLane(laneId, cardId));
  }
});

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

  return { laneCards }
}

const LaneContainer = compose(
  connect(() => mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);

export default LaneContainer;
