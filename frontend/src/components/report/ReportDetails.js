import React from 'react';

const ReportDetails = props => {
  console.log('report detauls props', props);
  if (props.report === null) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h3>Raportin tiedot:</h3>
      <h2>{props.report[0].program_name}</h2>
    </div>
  );
};

export default ReportDetails;
