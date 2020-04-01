import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ handleChange, value }) => {
  return (
    <div>
      rajaa näytettäviä
      <input onChange={handleChange} value={value} />
    </div>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Filter;
