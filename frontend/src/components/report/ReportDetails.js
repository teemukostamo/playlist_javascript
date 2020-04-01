import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { updateReport, copyReport } from '../../actions/reportActions';
import { setNotification } from '../../reducers/notificationReducer';

const ReportDetails = ({
  report,
  users,
  programs,
  login,
  updateReportConnect,
  copyReportConnect,
  setNotificationConnect
}) => {
  const [programId, setProgramId] = useState('');
  const [programNumber, setProgramNumber] = useState('');
  const [dj, setDj] = useState('');
  const [programDate, setProgramDate] = useState('');
  const [programStartTime, setProgramStartTime] = useState('');
  const [programEndTime, setProgramEndTime] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [rerun, setRerun] = useState(null);

  useEffect(() => {
    if (report.reportDetails !== null) {
      setUserId(report.reportDetails.user_id);
      setProgramId(report.reportDetails.program_id);
      setDj(report.reportDetails.program_dj);
      setProgramNumber(report.reportDetails.program_no);
      setProgramDate(new Date(report.reportDetails.program_date));
      setProgramStartTime(report.reportDetails.program_start_time);
      setProgramEndTime(report.reportDetails.program_end_time);
      setStatus(report.reportDetails.status);
      setRerun(report.reportDetails.rerun);
    }
  }, [report.reportDetails]);

  if (
    report.reportDetails === null ||
    users.users === null ||
    programs.allPrograms === null
  ) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content='Ladataan...' />
        </Dimmer>
      </Segment>
    );
  }

  const programOptions = programs.allPrograms.map(program => ({
    key: program.id,
    text: program.name,
    value: program.id
  }));
  const userOptions = users.users.map(user => ({
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
      id: report.reportDetails.id,
      user_id: userId,
      program_id: programId,
      program_date: moment(programDate).format('YYYY-MM-DD'),
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      program_name: report.reportDetails.program_name,
      status,
      rerun
    };
    if (
      parseInt(updatedReportDetails.program_start_time) >=
      parseInt(updatedReportDetails.program_end_time)
    ) {
      setNotificationConnect('Tarkasta aloitus- ja lopetusaika!', 'fail');
    } else {
      setNotificationConnect('Muutokset tallennettu!', 'success');
      updateReportConnect(updatedReportDetails);
    }
  };

  // copy report for rerun
  const handleCopyReportClick = e => {
    e.preventDefault();
    const reportDetailsToCopy = {
      user_id: userId,
      program_id: programId,
      program_date: moment(programDate).format('YYYY-MM-DD'),
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_name: report.reportDetails.program_name,
      program_dj: dj,
      status,
      rerun
    };
    const reportTracksToCopy = report.report;
    copyReportConnect(reportDetailsToCopy, reportTracksToCopy);
    setNotificationConnect(
      `Raportti monistettu ajankohtaan ${moment(programDate).format(
        'YYYY-MM-DD'
      )}`,
      'success'
    );
  };

  const rerunCheckBox = () => {
    if (login.level === 1) {
      return null;
    }
    return (
      <Form.Field
        label='Uusinta'
        control={Form.Checkbox}
        name='rerun'
        onChange={getRerun}
        checked={!!rerun}
      />
    );
  };

  const duplicateBtn = () => {
    if (login.level === 1) {
      return null;
    }
    return <Button onClick={handleCopyReportClick}>Monista</Button>;
  };

  return (
    <div>
      <Header>Lisää biisi raporttiin:</Header>
      <Segment.Group horizontal>
        <Segment>
          <SearchTrack />
        </Segment>
        <Segment>
          <GetDjOnlineTracks />
        </Segment>
      </Segment.Group>

      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Raportin tiedot:</Header>
            <Form>
              <Form.Field
                label='Ohjelma'
                control={Dropdown}
                placeholder='Ohjelma'
                openOnFocus
                selection
                value={programId}
                search
                options={programOptions}
                onChange={getProgram}
              />
              <Form.Field
                label='Ohjelmanumero'
                control={Form.Input}
                defaultValue={programNumber}
                onChange={e => setProgramNumber(e.target.value)}
              />
              <Form.Field
                label='DJ'
                control={Form.Input}
                value={dj}
                onChange={e => setDj(e.target.value)}
              />
              <Form.Group widths='equal'>
                <Form.Field
                  label='Ohjelman päivä'
                  control={DatePicker}
                  selected={programDate}
                  disabledKeyboardNavigation
                  dateFormat='dd.MM.yyyy'
                  onChange={date => setProgramDate(new Date(date))}
                  locale={fi}
                />
                <Form.Field
                  label='Alkaa kello'
                  control={Dropdown}
                  value={programStartTime}
                  openOnFocus
                  selection
                  search
                  options={startTimeOptions}
                  onChange={getStartTime}
                />
                <Form.Field
                  label='Päättyy kello'
                  control={Dropdown}
                  value={programEndTime}
                  openOnFocus
                  selection
                  search
                  options={endTimeOptions}
                  onChange={getEndTime}
                />
              </Form.Group>
              <Form.Field
                label='Raportin tila'
                control={Dropdown}
                openOnFocus
                selection
                options={statusOptions}
                onChange={getStatus}
                value={status}
              />
              <Form.Field
                label='Käyttäjä'
                control={Dropdown}
                placeholder='Käyttäjä'
                openOnFocus={false}
                value={userId}
                selection
                search
                options={userOptions}
                onChange={getUser}
              />
              {rerunCheckBox()}
              <Form.Group widths='equal'>
                <Button color='green' onClick={saveChanges}>
                  Tallenna
                </Button>
                {duplicateBtn()}
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

ReportDetails.propTypes = {
  report: PropTypes.shape({
    reportDetails: PropTypes.shape({
      program_name: PropTypes.string,
      program_no: PropTypes.number,
      program_dj: PropTypes.string,
      program_date: PropTypes.string,
      program_start_time: PropTypes.string,
      program_end_time: PropTypes.string,
      id: PropTypes.number,
      program_id: PropTypes.number,
      rerun: PropTypes.number,
      status: PropTypes.number,
      user_id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }),
    report: PropTypes.arrayOf(
      PropTypes.shape({
        sortable_rank: PropTypes.number,
        artist_name: PropTypes.string,
        track_title: PropTypes.string,
        length: PropTypes.number,
        track_id: PropTypes.number,
        artist_id: PropTypes.number,
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        disc_no: PropTypes.number,
        track_no: PropTypes.number,
        cat_id: PropTypes.string,
        country: PropTypes.number,
        isrc: PropTypes.string,
        label: PropTypes.string,
        people: PropTypes.string,
        record_country: PropTypes.string,
        year: PropTypes.string,
        report_track_id: PropTypes.number
      })
    )
  }),
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        zip: PropTypes.string,
        city: PropTypes.string,
        country: PropTypes.string,
        phone: PropTypes.string,
        status: PropTypes.number,
        level: PropTypes.number,
        last_seen: PropTypes.string,
        reset_key: PropTypes.string,
        old_id: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string
      })
    ),
    current: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      zip: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      phone: PropTypes.string,
      status: PropTypes.number,
      level: PropTypes.number,
      last_seen: PropTypes.string,
      reset_key: PropTypes.string,
      old_id: PropTypes.number,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    }),
    loading: PropTypes.bool
  }),
  programs: PropTypes.shape({
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
    )
  }),
  login: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    level: PropTypes.number,
    status: PropTypes.number,
    loading: PropTypes.bool
  }),
  setNotificationConnect: PropTypes.func,
  updateReportConnect: PropTypes.func,
  copyReportConnect: PropTypes.func
};

const mapStateToProps = state => {
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
  updateReportConnect: updateReport,
  copyReportConnect: copyReport,
  setNotificationConnect: setNotification
})(ReportDetails);

export default connectedReportDetails;
