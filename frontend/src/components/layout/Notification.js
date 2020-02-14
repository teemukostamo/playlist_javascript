import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  if (notification.type === 'success') {
    return (
      <div className='fixedTop'>
        <Message floating success header={notification.message} />
      </div>
    );
  }

  if (notification.type === 'fail') {
    return (
      <div className='fixedTop'>
        <Message floating negative header={notification.message} />
      </div>
    );
  }

  return null;
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
