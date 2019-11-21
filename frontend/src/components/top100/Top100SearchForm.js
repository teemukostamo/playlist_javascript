import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTop100 } from '../../actions/searchActions';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import fi from 'date-fns/locale/fi';

const Top100SearchForm = props => {
  const [startDate, setStartDate] = useState(Date.now() - 7 * 24 * 3600 * 1000);
  const [endDate, setEndDate] = useState(new Date());
  const [list, setList] = useState('artist_id');
  // useEffect(() => {
  //   const query = {
  //     list,
  //     start_date: moment()
  //       .subtract(7, 'd')
  //       .format('YYYY-MM-DD'),
  //     end_date: moment(endDate).format('YYYY-MM-DD')
  //   };
  //   console.log(query);
  //   props.getTop100(query);
  //   // eslint-disable-next-line
  // }, []);
  console.log('start date', startDate);

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
            defaultValue={list}
            options={listOptions}
            onChange={getListOptions}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Alkaen</label>
          <DatePicker
            selected={startDate}
            disabledKeyboardNavigation={true}
            dateFormat="dd.MM.yyyy"
            onChange={date => setStartDate(date)}
            locale={fi}
          />
        </Form.Field>
        <Form.Field>
          <label>Päättyen</label>
          <DatePicker
            selected={endDate}
            disabledKeyboardNavigation={true}
            dateFormat="dd.MM.yyyy"
            onChange={date => setEndDate(date)}
            locale={fi}
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

const connectedTop100SearchForm = connect(null, { getTop100 })(
  Top100SearchForm
);

export default connectedTop100SearchForm;
