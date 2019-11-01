import React, { useState } from 'react';
import { getDjonlineTracks } from '../../actions/trackActions';
import { connect } from 'react-redux';
import { Form, Button, Dropdown, Grid, Header } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const GetDjOnlineTracks = props => {
  const [date, setDate] = useState(new Date());
  const [studioId, setStudioId] = useState('928');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const getStudioId = (e, { value }) => {
    e.preventDefault();
    setStudioId(value);
  };

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

  // list of program start time options
  const startTimeOptions = [
    {
      key: '00:00',
      text: '00:00',
      value: '00'
    },
    {
      key: '01:00',
      text: '01:00',
      value: '01'
    },
    {
      key: '02:00',
      text: '02:00',
      value: '02'
    },
    {
      key: '03:00',
      text: '03:00',
      value: '03'
    },
    {
      key: '04:00',
      text: '04:00',
      value: '04'
    },
    {
      key: '05:00',
      text: '05:00',
      value: '05'
    },
    {
      key: '06:00',
      text: '06:00',
      value: '06'
    },
    {
      key: '07:00',
      text: '07:00',
      value: '07'
    },
    {
      key: '08:00',
      text: '08:00',
      value: '08'
    },
    {
      key: '09:00',
      text: '09:00',
      value: '09'
    },
    {
      key: '10:00',
      text: '10:00',
      value: '10'
    },
    {
      key: '11:00',
      text: '11:00',
      value: '11'
    },
    {
      key: '12:00',
      text: '12:00',
      value: '12'
    },
    {
      key: '13:00',
      text: '13:00',
      value: '13'
    },
    {
      key: '14:00',
      text: '14:00',
      value: '14'
    },
    {
      key: '15:00',
      text: '15:00',
      value: '15'
    },
    {
      key: '16:00',
      text: '16:00',
      value: '16'
    },
    {
      key: '17:00',
      text: '17:00',
      value: '17'
    },
    {
      key: '18:00',
      text: '18:00',
      value: '18'
    },
    {
      key: '19:00',
      text: '19:00',
      value: '19'
    },
    {
      key: '20:00',
      text: '20:00',
      value: '20'
    },
    {
      key: '21:00',
      text: '21:00',
      value: '21'
    },
    {
      key: '22:00',
      text: '22:00',
      value: '22'
    },
    {
      key: '23:00',
      text: '23:00',
      value: '23'
    }
  ];
  const getStartTime = (event, { value }) => {
    event.preventDefault();
    setStartTime(value);
  };

  // list of program end time options
  const endTimeOptions = [
    {
      key: '01:00',
      text: '01:00',
      value: '01'
    },
    {
      key: '02:00',
      text: '02:00',
      value: '02'
    },
    {
      key: '03:00',
      text: '03:00',
      value: '03'
    },
    {
      key: '04:00',
      text: '04:00',
      value: '04'
    },
    {
      key: '05:00',
      text: '05:00',
      value: '05'
    },
    {
      key: '06:00',
      text: '06:00',
      value: '06'
    },
    {
      key: '07:00',
      text: '07:00',
      value: '07'
    },
    {
      key: '08:00',
      text: '08:00',
      value: '08'
    },
    {
      key: '09:00',
      text: '09:00',
      value: '09'
    },
    {
      key: '10:00',
      text: '10:00',
      value: '10'
    },
    {
      key: '11:00',
      text: '11:00',
      value: '11'
    },
    {
      key: '12:00',
      text: '12:00',
      value: '12'
    },
    {
      key: '13:00',
      text: '13:00',
      value: '13'
    },
    {
      key: '14:00',
      text: '14:00',
      value: '14'
    },
    {
      key: '15:00',
      text: '15:00',
      value: '15'
    },
    {
      key: '16:00',
      text: '16:00',
      value: '16'
    },
    {
      key: '17:00',
      text: '17:00',
      value: '17'
    },
    {
      key: '18:00',
      text: '18:00',
      value: '18'
    },
    {
      key: '19:00',
      text: '19:00',
      value: '19'
    },
    {
      key: '20:00',
      text: '20:00',
      value: '20'
    },
    {
      key: '21:00',
      text: '21:00',
      value: '21'
    },
    {
      key: '22:00',
      text: '22:00',
      value: '22'
    },
    {
      key: '23:00',
      text: '23:00',
      value: '23'
    },
    {
      key: '24:00',
      text: '24:00',
      value: '24'
    }
  ];
  const getEndTime = (event, { value }) => {
    event.preventDefault();
    setEndTime(value);
  };

  const GetTracksFromApi = () => {
    const searchParams = {
      studioId,
      date: moment(date).format('YYYY-MM-DD'),
      startTime,
      endTime,
      report_id: props.report.reportDetails.id,
      sortable_rank_start: props.report.report.length
    };
    props.getDjonlineTracks(searchParams);
  };

  return (
    <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Form>
            <Header>Hae biisit DJOnlinesta</Header>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Valitse päivä</label>
                <DatePicker
                  selected={date}
                  dateFormat="yyyy-MM-dd"
                  onChange={date => setDate(date)}
                />
              </Form.Field>
              <Form.Field>
                <label>Valitse studio</label>
                <Dropdown
                  placeholder="Studio 1"
                  openOnFocus
                  selection
                  options={studioOptions}
                  onChange={getStudioId}
                />{' '}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Alkaen kello</label>
                <Dropdown
                  placeholder="Alkaen HH:MM"
                  openOnFocus
                  selection
                  search
                  options={startTimeOptions}
                  onChange={getStartTime}
                />{' '}
              </Form.Field>
              <Form.Field>
                <label>Päättyen kello</label>
                <Dropdown
                  placeholder="Päättyen HH:MM"
                  openOnFocus
                  selection
                  search
                  options={endTimeOptions}
                  onChange={getEndTime}
                />{' '}
              </Form.Field>
            </Form.Group>
            <Button onClick={GetTracksFromApi}>Hae</Button>
          </Form>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('getdjonlinetracks state to props', state);
  return {
    report: state.report,
    reportsList: state.reportsList,
    programs: state.programs,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const connectedGetDjOnlineTracks = connect(
  mapStateToProps,
  { getDjonlineTracks }
)(GetDjOnlineTracks);

export default connectedGetDjOnlineTracks;
