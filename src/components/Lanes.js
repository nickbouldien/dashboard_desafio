import React from 'react';
import PropTypes from 'prop-types';
import LaneContainer from '../containers/LaneContainer';

const Lanes = ({ lanes }) => {
  if(lanes.length === 0 ) { return <p>No data/lanes found</p> }
  return (
    <div className='lanes'>
      {
        lanes.map((lane) => <LaneContainer className='lane' key={lane.id} lane={lane} /> )
      }
    </div>
  );
}

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
