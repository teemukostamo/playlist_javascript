import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import fi from 'date-fns/locale/fi';
import moment from 'moment';
import SearchTrack from '../track/SearchTrack';
import GetDjOnlineTracks from '../track/GetDjOnlineTracks';
import Togglable from '../layout/Togglable';
import { updateReport } from '../../actions/reportActions';
import { copyReport } from '../../actions/reportActions';
import { setNotification } from '../../reducers/notificationReducer';

const ReportDetails = props => {
  const [programId, setProgramId] = useState('');
  const [programNumber, setProgramNumber] = useState('');
  const [dj, setDj] = useState('');
  const [programDate, setProgramDate] = useState('');
  const [programStartTime, setProgramStartTime] = useState('');
  const [programEndTime, setProgramEndTime] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [rerun, setRerun] = useState(null);

  console.log('report detauls props', props);
  useEffect(() => {
    if (props.report.reportDetails !== null) {
      setUserId(props.report.reportDetails.user_id);
      setProgramId(props.report.reportDetails.program_id);
      setDj(props.report.reportDetails.program_dj);
      setProgramNumber(props.report.reportDetails.program_no);
      setProgramDate(new Date(props.report.reportDetails.program_date));
      setProgramStartTime(props.report.reportDetails.program_start_time);
      setProgramEndTime(props.report.reportDetails.program_end_time);
      setStatus(props.report.reportDetails.status);
      setRerun(props.report.reportDetails.rerun);
    }
  }, [props.report.reportDetails]);

  if (props.report.reportDetails === null || props.users.users === null) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="Ladataan..." />
        </Dimmer>
      </Segment>
    );
  }

  let programOptions = props.programs.activePrograms.map(program => ({
    key: program.id,
    text: program.name,
    value: program.id
  }));
  let userOptions = props.users.users.map(user => ({
    key: user.id,
    text: `${user.first_name} ${user.last_name}`,
    value: user.id
  }));
  const getProgram = (event, { value }) => {
    event.preventDefault();
    setProgramId(value);
  };
  const getUser = (event, { value }) => {
    event.preventDefault();
    setUserId(value);
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

  // list of program status options
  const statusOptions = [
    {
      key: 0,
      text: 'Keskeneräinen',
      value: 0
    },
    {
      key: 1,
      text: 'Valmis',
      value: 1
    },
    {
      key: 9,
      text: 'Poistettu',
      value: 9
    }
  ];
  const getStatus = (event, { value }) => {
    event.preventDefault();
    setStatus(value);
  };

  const getRerun = () => {
    console.log('getting rerun');
    if (rerun === null) {
      setRerun(1);
    } else {
      setRerun(null);
    }
  };

  // save changes to db
  const saveChanges = e => {
    e.preventDefault();
    const updatedReportDetails = {
      id: props.report.reportDetails.id,
      user_id: userId,
      program_id: programId,
      program_date: moment(programDate).format('YYYY-MM-DD'),
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      status: status,
      rerun: rerun
    };
    if (
      parseInt(updatedReportDetails.program_start_time) >
      parseInt(updatedReportDetails.program_end_time)
    ) {
      props.setNotification('Tarkasta aloitus- ja lopetusaika!', 'fail');
    } else {
      console.log('saving changes...', updatedReportDetails);
      props.setNotification('Muutokset tallennettu!', 'success');
      props.updateReport(updatedReportDetails);
    }
  };

  // copy report for rerun
  const copyReport = e => {
    e.preventDefault();
    console.log('klikd copy');
    const reportDetailsToCopy = {
      user_id: userId,
      program_id: programId,
      program_date: moment(programDate).format('YYYY-MM-DD'),
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      status: status,
      rerun: rerun
    };
    const reportTracksToCopy = props.report.report;
    console.log(reportDetailsToCopy);
    console.log(reportTracksToCopy);
    props.copyReport(reportDetailsToCopy, reportTracksToCopy);
    props.setNotification(
      `Raportti monistettu ajankohtaan ${moment(programDate).format(
        'YYYY-MM-DD'
      )}`,
      'success'
    );
  };
  return (
    <div>
      <Header>Lisää biisi raporttiin:</Header>
      <Segment.Group horizontal>
        <Segment>
          <Togglable color="blue" buttonLabel="Pikahaku">
            <SearchTrack />
          </Togglable>
        </Segment>
        <Segment>
          <Togglable color="blue" buttonLabel="Hae biisit DJonlinesta">
            <GetDjOnlineTracks />
          </Togglable>
        </Segment>
      </Segment.Group>

      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Raportin tiedot:</Header>
            <Form>
              <Form.Field>
                <label>Ohjelma</label>
                <Dropdown
                  placeholder="Ohjelma"
                  openOnFocus
                  selection
                  value={programId}
                  search
                  options={programOptions}
                  onChange={getProgram}
                />{' '}
              </Form.Field>
              <Form.Field>
                <label>Ohjelmanumero</label>
                <Form.Input
                  defaultValue={programNumber}
                  onChange={e => setProgramNumber(e.target.value)}
                />{' '}
              </Form.Field>
              <Form.Field>
                <label>DJ</label>
                <Form.Input
                  value={dj}
                  onChange={e => setDj(e.target.value)}
                />{' '}
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>Ohjelman päivä</label>

                  <DatePicker
                    selected={programDate}
                    disabledKeyboardNavigation={true}
                    dateFormat="dd.MM.yyyy"
                    onChange={date => setProgramDate(date)}
                    locale={fi}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Alkaa kello</label>
                  <Dropdown
                    value={programStartTime}
                    openOnFocus
                    selection
                    search
                    options={startTimeOptions}
                    onChange={getStartTime}
                  />{' '}
                </Form.Field>

                <Form.Field>
                  <label>Päättyy kello</label>
                  <Dropdown
                    value={programEndTime}
                    openOnFocus
                    selection
                    search
                    options={endTimeOptions}
                    onChange={getEndTime}
                  />{' '}
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Raportin tila</label>
                <Dropdown
                  openOnFocus
                  selection
                  options={statusOptions}
                  onChange={getStatus}
                  value={status}
                />{' '}
              </Form.Field>
              <Form.Field>
                <label>Käyttäjä</label>
                <Dropdown
                  placeholder="Käyttäjä"
                  openOnFocus={false}
                  value={userId}
                  selection
                  search
                  options={userOptions}
                  onChange={getUser}
                />
              </Form.Field>
              <Form.Field>
                <label>Uusinta</label>
                <Form.Checkbox
                  name="rerun"
                  onChange={getRerun}
                  checked={rerun ? true : false}
                />
              </Form.Field>
              <Form.Group widths="equal">
                <Button color="green" onClick={saveChanges}>
                  Tallenna
                </Button>
                <Button onClick={copyReport}>Monista</Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('report details state to props', state);
  return {
    report: state.report,
    reportsList: state.reportsList,
    programs: state.programs,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const connectedReportDetails = connect(mapStateToProps, {
  updateReport,
  copyReport,
  setNotification
})(ReportDetails);

export default connectedReportDetails;
