import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateReport } from '../../actions/reportActions';

import { Header, Form, Button, Dropdown } from 'semantic-ui-react';
import AddTrackToReport from '../track/AddTrackToReport';
import GetDjOnlineTracks from '../track/GetDjOnlineTracks';
import Togglable from '../layout/Togglable';

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
      setProgramDate(props.report.reportDetails.program_date);
      setProgramStartTime(props.report.reportDetails.program_start_time);
      setProgramEndTime(props.report.reportDetails.program_end_time);
      setStatus(props.report.reportDetails.status);
    }
  }, [props.report.reportDetails]);

  if (props.report.reportDetails === null || props.users.users === null) {
    return <div>loading...</div>;
  }

  let programOptions = props.programs.allPrograms.map(program => ({
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
      key: '00:00',
      text: '00:00',
      value: '00:00'
    },
    {
      key: '01:00',
      text: '01:00',
      value: '01:00'
    },
    {
      key: '02:00',
      text: '02:00',
      value: '02:00'
    },
    {
      key: '03:00',
      text: '03:00',
      value: '03:00'
    },
    {
      key: '04:00',
      text: '04:00',
      value: '04:00'
    },
    {
      key: '05:00',
      text: '05:00',
      value: '05:00'
    },
    {
      key: '06:00',
      text: '06:00',
      value: '06:00'
    },
    {
      key: '07:00',
      text: '07:00',
      value: '07:00'
    },
    {
      key: '08:00',
      text: '08:00',
      value: '08:00'
    },
    {
      key: '09:00',
      text: '09:00',
      value: '09:00'
    },
    {
      key: '10:00',
      text: '10:00',
      value: '10:00'
    },
    {
      key: '11:00',
      text: '11:00',
      value: '11:00'
    },
    {
      key: '12:00',
      text: '12:00',
      value: '12:00'
    },
    {
      key: '13:00',
      text: '13:00',
      value: '13:00'
    },
    {
      key: '14:00',
      text: '14:00',
      value: '14:00'
    },
    {
      key: '15:00',
      text: '15:00',
      value: '15:00'
    },
    {
      key: '16:00',
      text: '16:00',
      value: '16:00'
    },
    {
      key: '17:00',
      text: '17:00',
      value: '17:00'
    },
    {
      key: '18:00',
      text: '18:00',
      value: '18:00'
    },
    {
      key: '19:00',
      text: '19:00',
      value: '19:00'
    },
    {
      key: '20:00',
      text: '20:00',
      value: '20:00'
    },
    {
      key: '21:00',
      text: '21:00',
      value: '21:00'
    },
    {
      key: '22:00',
      text: '22:00',
      value: '22:00'
    },
    {
      key: '23:00',
      text: '23:00',
      value: '23:00'
    }
  ];
  const getStartTime = (event, { value }) => {
    event.preventDefault();
    setProgramStartTime(value);
  };

  // list of program end time options
  const endTimeOptions = [
    {
      key: '01:00',
      text: '01:00',
      value: '01:00'
    },
    {
      key: '02:00',
      text: '02:00',
      value: '02:00'
    },
    {
      key: '03:00',
      text: '03:00',
      value: '03:00'
    },
    {
      key: '04:00',
      text: '04:00',
      value: '04:00'
    },
    {
      key: '05:00',
      text: '05:00',
      value: '05:00'
    },
    {
      key: '06:00',
      text: '06:00',
      value: '06:00'
    },
    {
      key: '07:00',
      text: '07:00',
      value: '07:00'
    },
    {
      key: '08:00',
      text: '08:00',
      value: '08:00'
    },
    {
      key: '09:00',
      text: '09:00',
      value: '09:00'
    },
    {
      key: '10:00',
      text: '10:00',
      value: '10:00'
    },
    {
      key: '11:00',
      text: '11:00',
      value: '11:00'
    },
    {
      key: '12:00',
      text: '12:00',
      value: '12:00'
    },
    {
      key: '13:00',
      text: '13:00',
      value: '13:00'
    },
    {
      key: '14:00',
      text: '14:00',
      value: '14:00'
    },
    {
      key: '15:00',
      text: '15:00',
      value: '15:00'
    },
    {
      key: '16:00',
      text: '16:00',
      value: '16:00'
    },
    {
      key: '17:00',
      text: '17:00',
      value: '17:00'
    },
    {
      key: '18:00',
      text: '18:00',
      value: '18:00'
    },
    {
      key: '19:00',
      text: '19:00',
      value: '19:00'
    },
    {
      key: '20:00',
      text: '20:00',
      value: '20:00'
    },
    {
      key: '21:00',
      text: '21:00',
      value: '21:00'
    },
    {
      key: '22:00',
      text: '22:00',
      value: '22:00'
    },
    {
      key: '23:00',
      text: '23:00',
      value: '23:00'
    },
    {
      key: '23:59',
      text: '23:59',
      value: '23:59'
    }
  ];
  const getEndTime = (event, { value }) => {
    event.preventDefault();
    setProgramEndTime(value);
  };

  // list of program status options
  const statusOptions = [
    {
      key: '0',
      text: 'Keskeneräinen',
      value: '0'
    },
    {
      key: '1',
      text: 'Valmis',
      value: '1'
    },
    {
      key: '9',
      text: 'Poistettu',
      value: '9'
    }
  ];
  const getStatus = (event, { value }) => {
    event.preventDefault();
    setStatus(value);
  };

  // save changes to db
  const saveChanges = e => {
    e.preventDefault();
    const updatedReportDetails = {
      id: props.report.reportDetails.id,
      user_id: userId,
      program_id: programId,
      program_date: programDate,
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      status: status,
      rerun: rerun
    };
    console.log('saving changes...', updatedReportDetails);
    props.updateReport(updatedReportDetails);
  };

  // copy report for rerun
  const copyReport = e => {
    e.preventDefault();
    console.log('klikd copy');
  };
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <AddTrackToReport />
          <Togglable buttonLabel="Hae biisit DJonlinesta">
            <GetDjOnlineTracks />
          </Togglable>
        </Form.Group>
      </Form>

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
            value={programNumber}
            onChange={e => setProgramNumber(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>DJ</label>
          <Form.Input value={dj} onChange={e => setDj(e.target.value)} />{' '}
        </Form.Field>
        <Form.Field>
          <label>Ohjelman päivä</label>
          <Form.Input
            value={programDate}
            selection="true"
            onChange={e => setProgramDate(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Ohjelma-aika</label>
        </Form.Field>
        <Form.Group widths="equal">
          <Dropdown
            placeholder={programStartTime}
            openOnFocus
            selection
            search
            options={startTimeOptions}
            onChange={getStartTime}
          />{' '}
          -
          <Dropdown
            placeholder={programEndTime}
            openOnFocus
            selection
            search
            options={endTimeOptions}
            onChange={getEndTime}
          />{' '}
        </Form.Group>
        <Form.Field>
          <label>Raportin tila</label>
          <Dropdown
            openOnFocus
            selection
            search
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
          <Form.Checkbox />
        </Form.Field>
        <Form.Group widths="equal">
          <Button onClick={saveChanges}>Tallenna</Button>
          <Button onClick={copyReport}>Monista</Button>
        </Form.Group>
      </Form>
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

const connectedReportDetails = connect(
  mapStateToProps,
  { updateReport }
)(ReportDetails);

export default connectedReportDetails;
