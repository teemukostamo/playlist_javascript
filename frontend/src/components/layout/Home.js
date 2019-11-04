import React from 'react';
import { Container } from 'semantic-ui-react';
import CreateNewReportForm from '../report/CreateNewReportForm';

const Home = () => {
  return (
    <Container>
      <h2>Radio Helsinki teostoraportointi</h2>
      <CreateNewReportForm />
    </Container>
  );
};

export default Home;
