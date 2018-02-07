import React from 'react';
import Lane from './Lane';
import PropTypes from 'prop-types';

const Lanes = ({ lanes }) => {
  if(lanes.length === 0 ) { return <p>No data/lanes found</p> }
  return (
    <div className='lanes'>
      {
        lanes.map((lane) => <Lane className='lane' key={lane.id} lane={lane} /> )
      }
    </div>
  );
}

Lanes.propTypes = {
  lanes: PropTypes.array
};

export default Lanes;
