import React, { useState } from 'react';
import { Header, Form, Button, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

const CreateNewReportForm = props => {
  const [programId, setProgramId] = useState('');
  const [programNumber, setProgramNumber] = useState('');
  const [dj, setDj] = useState('');
  const [programDate, setProgramDate] = useState('');
  const [programStartTime, setProgramStartTime] = useState('');
  const [programEndTime, setProgramEndTime] = useState('');
  const [rerun, setRerun] = useState(null);

  if (props.programs.allPrograms === null) {
    return <div>loafing</div>;
  }

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
    console.log('creating report...');
  };
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
  null
)(CreateNewReportForm);

export default connectedCreateNewReportForm;
