import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import fi from 'date-fns/locale/fi';
import { getTop100 } from '../../actions/searchActions';

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
  const handleSearch = () => {
    const query = {
      list,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD')
    };
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
      <Form.Group widths='equal'>
        <Form.Field
          label='Hae'
          control={Dropdown}
          openOnFocus
          selection
          defaultValue={list}
          options={listOptions}
          onChange={getListOptions}
        />
        <Form.Field
          label='Alkaen'
          control={DatePicker}
          selected={startDate}
          disabledKeyboardNavigation
          dateFormat='dd.MM.yyyy'
          onChange={date => setStartDate(date)}
          locale={fi}
        />
        <Form.Field
          label='Päättyen'
          control={DatePicker}
          selected={endDate}
          disabledKeyboardNavigation
          dateFormat='dd.MM.yyyy'
          onChange={date => setEndDate(date)}
          locale={fi}
        />
        <Form.Field></Form.Field>
        <Form.Field></Form.Field>
        <Form.Field></Form.Field>
      </Form.Group>
      <Button color='blue' onClick={handleSearch}>
        Hae
      </Button>{' '}
    </Form>
  );
};

Top100SearchForm.propTypes = {
  getTop100: PropTypes.func.isRequired
};

const connectedTop100SearchForm = connect(null, { getTop100 })(
  Top100SearchForm
);

export default connectedTop100SearchForm;
