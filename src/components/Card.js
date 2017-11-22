import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
};

const cardTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

class Card extends Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, id, editing, ...props} = this.props;
    // Pass through if we are editing

    console.log('Card props, ', this.props);
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <div style={{
        opacity: isDragging ? 0.3 : 1
      }}>
        {props.cardData.city_name},
        {props.cardData.temp},
        {props.cardData.app_temp}
      </div>

      // <li style={{
      //   opacity: isDragging ? 0.3 : 1
      // }}
      // >
      //
      // </li>
    ));
  }
}

Card.propTypes = {
  weather: PropTypes.object,
  // city: PropTypes.string,
  searchTerm: PropTypes.string,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  editing: PropTypes.bool
};

export default compose(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Card);
