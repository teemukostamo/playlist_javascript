import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  if (notification.type === 'success') {
    return (
      <div className="fixedTop">
        <Message
          floating
          success
          header={notification.message}
          // content="You may now log-in with the username you have chosen"
        />
      </div>
    );
  }

  if (notification.type === 'fail') {
    return (
      <div className="fixedTop">
        <Message
          floating
          negative
          header={notification.message}
          // content="You may now log-in with the username you have chosen"
        />
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
