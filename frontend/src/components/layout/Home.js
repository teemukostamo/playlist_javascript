import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CreateNewReportForm from '../report/CreateNewReportForm';
import InProgressReportsList from '../report/InProgressReportsList';

const Home = ({ programs }) => {
  if (programs.activePrograms === null) {
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
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <CreateNewReportForm />
          <InProgressReportsList />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

Home.propTypes = {
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
    )
  })
};

const mapStateToProps = state => {
  return {
    programs: state.programs
  };
};

const connectedHome = connect(mapStateToProps, null)(Home);

export default connectedHome;
