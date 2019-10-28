import React from 'react';

import { Button, Modal } from 'semantic-ui-react';

const AddTrack = () => {
  return (
    <div>
      <Modal trigger={<Button>Lisää biisi raporttiin</Button>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddTrack;
