import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTop100 } from '../../actions/searchActions';
import {
  Header,
  Form,
  Button,
  Dropdown,
  Segment,
  Grid,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const Top100SearchForm = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [list, setList] = useState('');

  const handleSearch = () => {
    const query = {
      list,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD')
    };
    console.log('klikd search', query);
    props.getTop100(query);
  };

  const listOptions = [
    {
      key: 1,
      value: 'artist_id',
      text: 'Artistit'
    },
    {
      key: 2,
      value: 'track_id',
      text: 'Biisit'
    },
    {
      key: 3,
      value: 'album_id',
      text: 'Albumit'
    }
  ];

  const getListOptions = (e, { value }) => {
    e.preventDefault();
    setList(value);
  };
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Hae</label>
          <Dropdown
            openOnFocus
            selection
            defaultValue={'artist_id'}
            options={listOptions}
            onChange={getListOptions}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Alkaen</label>
          <DatePicker
            selected={startDate}
            disabledKeyboardNavigation={true}
            dateFormat="yyyy-MM-dd"
            onChange={date => setStartDate(date)}
          />
        </Form.Field>
        <Form.Field>
          <label>Päättyen</label>
          <DatePicker
            selected={endDate}
            disabledKeyboardNavigation={true}
            dateFormat="yyyy-MM-dd"
            onChange={date => setEndDate(date)}
          />
        </Form.Field>
        <Form.Field></Form.Field>
        <Form.Field></Form.Field>
        <Form.Field></Form.Field>
      </Form.Group>
      <Button color="blue" onClick={handleSearch}>
        Hae
      </Button>{' '}
    </Form>
  );
};

const connectedTop100SearchForm = connect(
  null,
  { getTop100 }
)(Top100SearchForm);

export default connectedTop100SearchForm;
