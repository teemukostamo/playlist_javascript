import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return <div style={style}>{notification.message}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
