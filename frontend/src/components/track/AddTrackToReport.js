import React from 'react';
import SearchTrack from './SearchTrack';
import { Button, Modal } from 'semantic-ui-react';

const AddTrack = () => {
  return (
    <div>
      <Modal trigger={<Button>Lisää biisi raporttiin</Button>}>
        <Modal.Header>Pikahaku</Modal.Header>
        <Modal.Content>
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
