import React from 'react';
import Lane from './Lane';
import PropTypes from 'prop-types';

const Lanes = ({ lanes }) => {
  return (
    <div className='lanes'>
      {
        lanes.map((lane) =>
          <Lane className='lane' key={lane.id} lane={lane} />
        )
      }
    </div>
  );
}

Lanes.propTypes = {
  lanes: PropTypes.array
};

export default Lanes;
