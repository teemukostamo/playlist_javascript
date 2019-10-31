import React from 'react';

const Filter = props => {
  return (
    <div>
      rajaa näytettäviä
      <input onChange={props.handleChange} value={props.value} />
    </div>
  );
};

export default Filter;
