import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import Cards from './Cards';
import ItemTypes from '../constants/itemTypes';
import { detachFromLane, attachToLane /*, move*/ } from '../actions/actionCreators';
// import Editable from './Editable.jsx';
// import * as laneActions from '../actions/lanes';
// import * as noteActions from '../actions/notes';
// import { getWeather, getStock, getCurrency } from '../actions/actionCreators';

const cardTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    console.log('cardTarget in Lane ', targetProps, 't/f: ', !targetProps.lane.cards.length,
      !targetProps.laneCards.length, 'sourceId: ', sourceId);

    if(!targetProps.lane.cards.length) {
      targetProps.attachToLane(
        targetProps.lane.id,
        sourceId
      );
    }
  }
};

class Lane extends React.Component {

  // deleteLane(lane, e) {
  //   e.stopPropagation();
  //
  //   const laneId = lane.id;
  //
  //   // Clean up notes
  //   lane.notes.forEach(noteId => {
  //     this.props.detachFromLane(laneId, noteId);
  //     // this.props.deleteNote(noteId);
  //   });
  //
  //   // this.props.deleteLane(laneId);
  // }

  // addNote(laneId, e) {
  //   e.stopPropagation();
  //
  //   const o = this.props.createNote({
  //     task: 'New task'
  //   });
  //   this.props.attachToLane(laneId, o.note.id);
  // }


  deleteNote(laneId, noteId, e) {
    e.stopPropagation();

    this.props.detachFromLane(laneId, noteId);
    this.props.deleteNote(noteId);
  }

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
          {/* <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, laneId)}>+</button>
          </div> */}
          {/* <Editable className="lane-name" editing={lane.editing}
            value={lane.name}
            onEdit={name => props.updateLane({ id: laneId, name, editing: false })}
          /> */}
          {/* <div className='lane-delete'>
            <button onClick={this.deleteLane.bind(this, lane)}>x</button>
          </div> */}
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



//
// const Lane = (props) => {
//   console.log('lane props ', props);
//   return (
//     <div>
//       <h3>lane here</h3>
//       <p>lane here {props.lane.id}</p>
//     </div>
//   )
// }
//
// export default Lane;
