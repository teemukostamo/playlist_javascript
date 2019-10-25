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
  const [rerun, setRerun] = useState(null);
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
      status: 1,
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
