import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

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
          <h3>{lane.name}</h3>
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

export default Lane;