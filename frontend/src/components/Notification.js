import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  const notification = props.notification.message;
  if (notification) {
    return <div>{notification}</div>;
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;
