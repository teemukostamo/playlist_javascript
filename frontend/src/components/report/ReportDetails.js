import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Header, Form, Button, Input, Dropdown } from 'semantic-ui-react';

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
  console.log('changed user id', userId);
  const saveChanges = e => {
    e.preventDefault();
    console.log('saving changes...');
  };
  const copyReport = e => {
    e.preventDefault();
    console.log('klikd copy');
  };
  console.log('program name', programNumber);
  return (
    <div>
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
          <Input
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
          <Form.Input
            fluid
            value={programStartTime}
            onChange={e => setProgramStartTime(e.target.value)}
          />{' '}
          -
          <Form.Input
            fluid
            value={programEndTime}
            onChange={e => setProgramEndTime(e.target.value)}
          />
        </Form.Group>
        <Form.Field>
          <label>Raportin tila</label>
          <Input
            value={status}
            selection
            onChange={e => setStatus(e.target.value)}
          />{' '}
        </Form.Field>
        <Form.Field>
          <label>Käyttäjä</label>
          <Dropdown
            placeholder="Käyttäjä"
            openOnFocus={false}
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
  null
)(ReportDetails);

export default connectedReportDetails;
