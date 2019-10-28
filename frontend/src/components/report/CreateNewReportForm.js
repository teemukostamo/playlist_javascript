import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Form, Button, Input, Dropdown } from 'semantic-ui-react';
import { createReport } from '../../actions/reportActions';

const CreateNewReportForm = props => {
  const [programId, setProgramId] = useState('');
  const [programNumber, setProgramNumber] = useState('');
  const [dj, setDj] = useState('');
  const [programDate, setProgramDate] = useState('');
  const [programStartTime, setProgramStartTime] = useState('');
  const [programEndTime, setProgramEndTime] = useState('');
  const [redirect, setRedirect] = useState(false);

  if (props.programs.allPrograms === null) {
    return <div>loafing</div>;
  }

  console.log('create new report form props', props);

  // list of programoptions for select
  let programOptions = props.programs.allPrograms.map(program => ({
    key: program.id,
    text: program.name,
    value: program.id
  }));
  const getProgram = (event, { value }) => {
    event.preventDefault();
    setProgramId(value);
    console.log(programId);
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
    console.log(programStartTime);
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
    console.log(programEndTime);
  };
  const createReport = () => {
    const newReport = {
      user_id: props.login.id,
      program_id: programId,
      program_date: programDate,
      program_start_time: programStartTime,
      program_end_time: programEndTime,
      program_no: programNumber,
      program_dj: dj,
      status: 0,
      rerun: null
    };
    props.createReport(newReport);
    console.log('create report button click pros', props.report.reportDetails);
    console.log('creating report:', newReport);
    setRedirect(true);
  };
  console.log(dj);

  if (redirect && props.report.newReport !== null) {
    console.log('create new report for after submit props', props);
    console.log('redirecting to id', props.report.newReport.id);
    return <Redirect to={`reports/${props.report.newReport.id}`} />;
  }

  return (
    <div>
      <Header>Luo uusi raportti</Header>
      <Form>
        <Form.Field>
          <label>Ohjelma</label>
          <Dropdown
            placeholder="Ohjelma"
            openOnFocus
            selection
            search
            options={programOptions}
            onChange={getProgram}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Ohjelmanumero</label>
          <Input
            type="number"
            value={programNumber}
            selection
            onChange={e => setProgramNumber(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>DJ</label>
          <Input
            value={dj}
            selection
            onChange={e => setDj(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Ohjelman päivä</label>
          <Input
            value={programDate}
            selection
            onChange={e => setProgramDate(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Ohjelma-aika</label>
        </Form.Field>
        <Form.Group widths="equal">
          <Dropdown
            placeholder="Alkaen hh:mm"
            openOnFocus
            selection
            search
            options={startTimeOptions}
            onChange={getStartTime}
          />{' '}
          -
          <Dropdown
            placeholder="Päättyen hh:mm"
            openOnFocus
            selection
            search
            options={endTimeOptions}
            onChange={getEndTime}
          />{' '}
        </Form.Group>
        <Form.Field>
          <label>Uusinta</label>
          <Form.Checkbox />
        </Form.Field>
        <Form.Group widths="equal">
          <Button onClick={createReport}>Jatka</Button>
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

const connectedCreateNewReportForm = connect(
  mapStateToProps,
  { createReport }
)(CreateNewReportForm);

export default connectedCreateNewReportForm;
