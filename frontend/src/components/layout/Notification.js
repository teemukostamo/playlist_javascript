import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Message, Ref, Sticky } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  const contextRef = createRef();
  if (notification.message === null) {
    return null;
  }

  if (notification.type === 'success') {
    return (
      <Ref innerRef={contextRef}>
        <Sticky context={contextRef}>
          <Message
            floating
            success
            header={notification.message}
            // content="You may now log-in with the username you have chosen"
          />
        </Sticky>
      </Ref>
    );
  }

  if (notification.type === 'fail') {
    return (
      <Message
        floating
        negative
        header={notification.message}
        // content="You may now log-in with the username you have chosen"
      />
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
