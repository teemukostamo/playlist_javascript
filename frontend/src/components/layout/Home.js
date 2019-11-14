import React from 'react';
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CreateNewReportForm from '../report/CreateNewReportForm';
import InProgressReportsList from '../report/InProgressReportsList';
import Notification from '../layout/Notification';
import { getAllInProgress } from '../../actions/reportsListActions';
import { useSearchTracksHook } from '../../hooks/searchTracksHook';

const Home = props => {
  console.log('home props', props);
  const { inputText, setInputText, search } = useSearchTracksHook();
  console.log(search);
  console.log(search);

  // useEffect(() => {
  //   props.getAllInProgress(props.login.id);
  //   // eslint-disable-next-line
  // }, []);
  if (
    props.programs.activePrograms === null
    // props.reportsList.inProgress === null
  ) {
    return (
      <Container>
        <h2>Radio Helsinki teostoraportointi</h2>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>{' '}
      </Container>
    );
  }
  return (
    <Container>
      <h2>Radio Helsinki teostoraportointi</h2>
      <Notification />
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <CreateNewReportForm />
          <InProgressReportsList />
        </Grid.Row>
      </Grid>
      <div>
        <input value={inputText} onChange={e => setInputText(e.target.value)} />
        <div>
          {search.loading && <div>...</div>}
          {search.error && <div>Error: {search.error.message}</div>}
          {search.result && (
            <div>
              <div>Results: {search.result.length}</div>
              <ul>
                {search.result.map(result => (
                  <li key={result.track_id}>{result.track_title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
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

const connectedHome = connect(
  mapStateToProps,
  { getAllInProgress, useSearchTracksHook }
)(Home);

export default connectedHome;
