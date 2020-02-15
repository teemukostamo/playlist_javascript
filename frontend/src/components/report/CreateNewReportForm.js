import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Button,
  Input,
  Dropdown,
  Container,
  Grid,
  Popup,
  Icon
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import moment from 'moment';
import Togglable from '../layout/Togglable';
import { setNotification } from '../../reducers/notificationReducer';
import { createReport } from '../../actions/reportActions';

const CreateNewReportForm = ({
  login,
  programs,
  report,
  setNotification,
  createReport
}) => {
  const [programId, setProgramId] = useState('');
  const [programNumber, setProgramNumber] = useState(null);
  const [dj, setDj] = useState(`${login.first_name} ${login.last_name}`);
  const [newProgramName, setNewProgramName] = useState('');
  const [programDate, setProgramDate] = useState(new Date());
  const [programStartTime, setProgramStartTime] = useState('');
  const [programEndTime, setProgramEndTime] = useState('');
  const [redirect, setRedirect] = useState(false);

  // list of programoptions for select
  const programOptions = programs.activePrograms.map(program => ({
    key: program.id,
    text: program.name,
    value: program.id
  }));
  const getProgram = (event, { value }) => {
    event.preventDefault();
    setProgramId(value);
  };

  // list of program start time options
  const startTimeOptions = [
    {
      key: 0,
      text: '00:00',
      value: '00:00:00'
    },
    {
      key: 1,
      text: '01:00',
      value: '01:00:00'
    },
    {
      key: 2,
      text: '02:00',
      value: '02:00:00'
    },
    {
      key: 3,
      text: '03:00',
      value: '03:00:00'
    },
    {
      key: 4,
      text: '04:00',
      value: '04:00:00'
    },
    {
      key: 5,
      text: '05:00',
      value: '05:00:00'
    },
    {
      key: 6,
      text: '06:00',
      value: '06:00:00'
    },
    {
      key: 7,
      text: '07:00',
      value: '07:00:00'
    },
    {
      key: 8,
      text: '08:00',
      value: '08:00:00'
    },
    {
      key: 9,
      text: '09:00',
      value: '09:00:00'
    },
    {
      key: 10,
      text: '10:00',
      value: '10:00:00'
    },
    {
      key: 11,
      text: '11:00',
      value: '11:00:00'
    },
    {
      key: 12,
      text: '12:00',
      value: '12:00:00'
    },
    {
      key: 13,
      text: '13:00',
      value: '13:00:00'
    },
    {
      key: 14,
      text: '14:00',
      value: '14:00:00'
    },
    {
      key: 15,
      text: '15:00',
      value: '15:00:00'
    },
    {
      key: 16,
      text: '16:00',
      value: '16:00:00'
    },
    {
      key: 17,
      text: '17:00',
      value: '17:00:00'
    },
    {
      key: 18,
      text: '18:00',
      value: '18:00:00'
    },
    {
      key: 19,
      text: '19:00',
      value: '19:00:00'
    },
    {
      key: 20,
      text: '20:00',
      value: '20:00:00'
    },
    {
      key: 21,
      text: '21:00',
      value: '21:00:00'
    },
    {
      key: 22,
      text: '22:00',
      value: '22:00:00'
    },
    {
      key: 23,
      text: '23:00',
      value: '23:00:00'
    }
  ];
  const getStartTime = (event, { value }) => {
    event.preventDefault();
    setProgramStartTime(value);
  };

  // list of program end time options
  const endTimeOptions = [
    {
      key: 0,
      text: '01:00',
      value: '01:00:00'
    },
    {
      key: 1,
      text: '02:00',
      value: '02:00:00'
    },
    {
      key: 2,
      text: '03:00',
      value: '03:00:00'
    },
    {
      key: 3,
      text: '04:00',
      value: '04:00:00'
    },
    {
      key: 4,
      text: '05:00',
      value: '05:00:00'
    },
    {
      key: 5,
      text: '06:00',
      value: '06:00:00'
    },
    {
      key: 6,
      text: '07:00',
      value: '07:00:00'
    },
    {
      key: 7,
      text: '08:00',
      value: '08:00:00'
    },
    {
      key: 8,
      text: '09:00',
      value: '09:00:00'
    },
    {
      key: 9,
      text: '10:00',
      value: '10:00:00'
    },
    {
      key: 10,
      text: '11:00',
      value: '11:00:00'
    },
    {
      key: 11,
      text: '12:00',
      value: '12:00:00'
    },
    {
      key: 12,
      text: '13:00',
      value: '13:00:00'
    },
    {
      key: 13,
      text: '14:00',
      value: '14:00:00'
    },
    {
      key: 14,
      text: '15:00',
      value: '15:00:00'
    },
    {
      key: 15,
      text: '16:00',
      value: '16:00:00'
    },
    {
      key: 16,
      text: '17:00',
      value: '17:00:00'
    },
    {
      key: 17,
      text: '18:00',
      value: '18:00:00'
    },
    {
      key: 18,
      text: '19:00',
      value: '19:00:00'
    },
    {
      key: 19,
      text: '20:00',
      value: '20:00:00'
    },
    {
      key: 20,
      text: '21:00',
      value: '21:00:00'
    },
    {
      key: 21,
      text: '22:00',
      value: '22:00:00'
    },
    {
      key: 22,
      text: '23:00',
      value: '23:00:00'
    },
    {
      key: 23,
      text: '23:59',
      value: '23:59:59'
    }
  ];
  const getEndTime = (event, { value }) => {
    event.preventDefault();
    setProgramEndTime(value);
  };

  const handleCreateReportClick = () => {
    const newReport = {
      user_id: login.id,
      program_id: programId,
      new_program_name: newProgramName,
      program_date: moment(programDate).format('YYYY-MM-DD'),
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      status: 0,
      rerun: null
    };
    if (
      parseInt(newReport.program_end_time) <=
      parseInt(newReport.program_start_time)
    ) {
      setNotification('Tarkista ohjelman alku- ja loppuaika!', 'fail');
    } else {
      createReport(newReport);
      setRedirect(true);
    }
  };

  const style = {
    borderRadius: 0,
    display: 'block',
    opacity: 0.9,
    padding: '2em'
  };

  if (redirect && report.newReport !== null) {
    return <Redirect to={`reports/${report.newReport.id}`} />;
  }

  let disabled;
  if (!programDate || !programStartTime || !programEndTime || !dj) {
    disabled = true;
  } else if (!programId && newProgramName === '') {
    disabled = true;
  } else {
    disabled = false;
  }

  return (
    <React.Fragment>
      <Grid.Column>
        <Container>
          <h3>Luo uusi raportti</h3>
          <Form>
            <Form.Field>
              <label>
                Ohjelma{' '}
                <Popup
                  trigger={
                    <Icon
                      style={{ display: 'inline' }}
                      name='question circle'
                    />
                  }
                  content='Valitse ohjelma listalta. Jos ohjelmaasi ei löydy listalta niin klikkaa Luo uusi ohjelma, kirjoita ohjelmasi nimi ja jatka'
                  style={style}
                  inverted
                />
              </label>
              <Dropdown
                placeholder='Valitse ohjelma'
                openOnFocus
                selection
                search
                options={programOptions}
                onChange={getProgram}
              />{' '}
              <Togglable
                style={{ marginTop: '0.5rem', float: 'right' }}
                size='tiny'
                buttonLabel='Luo uusi ohjelma'
              >
                <Form.Field
                  label='Uusi ohjelma'
                  control={Input}
                  type='text'
                  value={newProgramName}
                  onChange={e => setNewProgramName(e.target.value)}
                />
              </Togglable>
            </Form.Field>
            <Form.Field
              control={Input}
              type='number'
              onChange={e => setProgramNumber(e.target.value)}
              label={
                <span>
                  Ohjelmanumero{' '}
                  <Popup
                    trigger={
                      <Icon
                        style={{ display: 'inline' }}
                        name='question circle'
                      />
                    }
                    content='Tsekkaa ohjelmasi numero viikon ohjelmakartasta.'
                    style={style}
                    inverted
                  />
                </span>
              }
            />
            <Form.Field
              control={Input}
              type='text'
              value={dj}
              onChange={e => setDj(e.target.value)}
              label='DJ'
            />
            <Form.Group widths='equal'>
              <Form.Field
                control={DatePicker}
                locale={fi}
                selected={programDate}
                dateFormat='dd.MM.yyyy'
                onChange={date => setProgramDate(date)}
                label='Ohjelman päivä'
              />
              <Form.Field
                control={Dropdown}
                placeholder='hh:mm'
                openOnFocus
                selection
                search
                options={startTimeOptions}
                onChange={getStartTime}
                label='Alkaa kello'
              />
              <Form.Field
                control={Dropdown}
                placeholder='hh:mm'
                openOnFocus
                selection
                search
                options={endTimeOptions}
                onChange={getEndTime}
                label='Päättyy kello'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Button
                disabled={disabled}
                color='green'
                onClick={handleCreateReportClick}
              >
                Jatka
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Grid.Column>
    </React.Fragment>
  );
};

CreateNewReportForm.propTypes = {
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string
  }),
  programs: PropTypes.shape({
    activePrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    allPrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  }),
  report: PropTypes.shape({
    newReport: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  setNotification: PropTypes.func,
  createReport: PropTypes.func
};

const mapStateToProps = state => {
  return {
    report: state.report,
    programs: state.programs,
    login: state.login
  };
};

const connectedCreateNewReportForm = connect(mapStateToProps, {
  createReport,
  setNotification
})(CreateNewReportForm);

export default connectedCreateNewReportForm;
