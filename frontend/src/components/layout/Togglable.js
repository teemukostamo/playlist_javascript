import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Togglable = ({ size, style, color, buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          size={size}
          style={style}
          color={color}
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          size={size}
          style={style}
          color={color}
          onClick={toggleVisibility}
        >
          Piilota
        </Button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  buttonLabel: PropTypes.string,
  style: PropTypes.shape({
    marginTop: PropTypes.string,
    float: PropTypes.string
  }),
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object
};

export default Togglable;
