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

  // deleteNote(laneId, noteId, e) {
  //   e.stopPropagation();
  //
  //   this.props.detachFromLane(laneId, noteId);
  //   this.props.deleteNote(noteId);
  // }

  // componentWillReceiveProps(nextProps) {
  //
  //   if (true) {
  //     console.log('the next props are', nextProps);
  //   }
  // }

  // addCard(laneId, e) {
  //   e.stopPropagation();
  //   console.log('called addNote');
  //
  //   // const o = this.props.createNote({
  //   //   task: 'New task'
  //   // });
  //   this.props.attachToLane(laneId, o.note.id);
  // }

  render() {
    // const props = this.props;

    const { connectDropTarget, lane, laneCards, className } = this.props;
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

Lane.propTypes = {
  // connectDropTarget: PropTypes.function.isRequired,
  // attachToLane: PropTypes.function.isRequired,
  lane: PropTypes.object,
  laneCards: PropTypes.array,
  className: PropTypes.string,
};

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
    laneCards: props.lane.cards.map(id => state.weather[
      state.weather.findIndex(card => card.id === id)
    ]).filter(card => card)
  }), mapDispatchToProps),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
