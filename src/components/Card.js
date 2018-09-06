import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderCard from './RenderCard';

class Card extends Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging,
      onMove, id, editing, ...props } = this.props;

    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <div className='card-div' style={{
        opacity: isDragging ? 0.3 : 1,
        color: isDragging ? 'blue' : 'grey',
      }}>

        <RenderCard type={props.cardData.type} data={props.cardData} />

      </div>
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  editing: PropTypes.bool,
};

export default Card;
