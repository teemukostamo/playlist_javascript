import React from 'react';
import SearchTrack from './SearchTrack';
import { Button, Modal } from 'semantic-ui-react';

const AddTrack = () => {
  return (
    <div>
      <Modal
        size="large"
        trigger={<Button>Lisää biisi raporttiin</Button>}
        closeIcon
      >
        <Modal.Header>Pikahaku</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <p>Hae esittäjän tai biisin nimellä.</p>
          </Modal.Description>
          <SearchTrack />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddTrack;
