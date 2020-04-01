import React from 'react';
import { connect } from 'react-redux';

const ModalNotification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  if (notification.type === 'success') {
    return <span style={{ color: 'green' }}>{notification.message}</span>;
  }
  if (notification.type === 'fail') {
    return <span style={{ color: 'red' }}>{notification.message}</span>;
  }
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

const connectedModalNotification = connect(
  mapStateToProps,
  null
)(ModalNotification);

export default connectedModalNotification;
