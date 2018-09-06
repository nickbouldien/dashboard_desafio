import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderCard from './RenderCard';

class ItemCard extends Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging,
      onMove, id, editing, ...props } = this.props;

    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <div className='card-div' style={{
        opacity: isDragging ? 0.3 : 1,
        color: isDragging ? 'blue' : 'grey',
      }}>

        <RenderCard data={props.cardData} />

      </div>
    ));
  }
}

ItemCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default ItemCard;
