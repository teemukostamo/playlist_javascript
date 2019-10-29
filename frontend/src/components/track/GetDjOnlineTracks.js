import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Dropdown } from 'semantic-ui-react';

const GetDjOnlineTracks = () => {
  const [date, setDate] = useState('');
  console.log(date);
  const [studioId, setStudioId] = useState('928');

  const getStudioId = (e, { value }) => {
    e.preventDefault();
    setStudioId(value);
  };
  console.log(studioId);

  const studioOptions = [
    {
      key: '928',
      text: 'Studio 1',
      value: '928'
    },
    {
      key: '1047',
      text: 'Studio 2',
      value: '1047'
    }
  ];

  const GetTracksFromApi = async () => {
    const tracks = axios.get(``);
  };

  return (
    <div>
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Päivämäärä YYYY-MM-DD"
          onChange={e => setDate(e.target.value)}
        />
        <Dropdown
          placeholder="Studio 1"
          openOnFocus
          selection
          options={studioOptions}
          onChange={getStudioId}
        />{' '}
        <Button onClick={GetTracksFromApi}>Hae</Button>
      </Form.Group>
    </div>
  );
};

export default GetDjOnlineTracks;
