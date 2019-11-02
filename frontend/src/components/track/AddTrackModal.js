import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrent } from '../../actions/userActions';
import { Modal, Header, Form, Button, Input } from 'semantic-ui-react';

const AddTrackModal = () => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [track, setTrack] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [country, setCountry] = useState('');
  const [record_country, setRecord_country] = useState('');
  const [people, setPeople] = useState('');
  const [disc_no, setDisc_no] = useState('');
  const [track_no, setTrack_no] = useState('');

  const submitTrack = () => {
    console.log('klikd submit track');
  };
  return (
    <Modal trigger={<Button>Lisää uusi biisi</Button>}>
      <Header content="Lisää uusi biisi" />
      <Modal.Content>
        <Form onSubmit={submitTrack}>
          <Form.Field>
            <label>Artisti</label>
            <Input
              value={artist}
              type="text"
              placeholder="Artisti..."
              onChange={e => setArtist(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Albumi</label>
            <Input
              value={album}
              type="text"
              placeholder="Albumi..."
              onChange={e => setAlbum(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Tallenna ja lisää raporttiin</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddTrackModal;
