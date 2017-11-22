import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
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
          , 1300);


    if(!targetProps.lane.cards.length) {
      targetProps.attachToLane(
        targetProps.lane.id,
        sourceId
      );
    }
  }
};

class Lane extends React.Component {

  // deleteNote(laneId, noteId, e) {
  //   e.stopPropagation();
  //
  //   this.props.detachFromLane(laneId, noteId);
  //   this.props.deleteNote(noteId);
  // }

  render() {
    const props = this.props;

    const { connectDropTarget, lane, laneCards, className } = props;
    const laneId = lane.id;

    console.log('Lane props ', this.props, 'laneId ', laneId);

    return connectDropTarget(
      <div className={className}>
        <div className='lane-header'
          // onClick={() => props.updateLane({ id: laneId, editing: true })}
          >
          <h4>{lane.name}</h4>
        </div>
        <Cards
          cards={laneCards}
          // onValueClick={id => props.updateNote({ id, editing: true })}
          // onEdit={(id, task) => props.updateNote({ id, task, editing: false })}
          // onDelete={(id, e) => this.deleteNote(laneId, id, e)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  attachToLane(targetPropsLaneId, sourceId) {
    dispatch(attachToLane(targetPropsLaneId, sourceId));
  },
  detachFromLane(laneId, cardId) {
    dispatch(detachFromLane(laneId, cardId));
  }
});

export default compose(
  connect((state, props) => ({
    // TODO: change weatherReducer to "cards"
    laneCards: props.lane.cards.map(id => state.weatherReducer[
      state.weatherReducer.findIndex(card => card.id === id)
    ]).filter(card => card)
  }), mapDispatchToProps),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
