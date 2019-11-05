import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import CreateNewReportForm from '../report/CreateNewReportForm';
import InProgressReportsList from '../report/InProgressReportsList';

const Home = () => {
  return (
    <Container>
      <h2>Radio Helsinki teostoraportointi</h2>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <CreateNewReportForm />
          <InProgressReportsList />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
