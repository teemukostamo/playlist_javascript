import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteInProgressReport } from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';
import { Table, Icon, Loader, Dimmer } from 'semantic-ui-react';

const inProgressReportListItem = ({
  report,
  reportsList,
  login,
  deleteInProgressReport,
  setNotification
}) => {
  if (reportsList.loading === true) {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }
  const onDelete = () => {
    const params = {
      report_id: report.id,
      user_id: login.id
    };
    console.log(`klikd delete on report`, params);
    deleteInProgressReport(params);
    setNotification(
      `Raportti ${report.name} ${report.program_date} poistettu`,
      'success'
    );
  };
  console.log(report, login, reportsList);
  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>
          <Link to={`reports/${report.id}`}>{report.name}</Link>
        </Table.Cell>
        <Table.Cell>{report.program_date}</Table.Cell>
        <Table.Cell>{report.program_no}</Table.Cell>
        <Table.Cell>
          {' '}
          <Icon color="red" onClick={onDelete} name="delete" />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    reportsList: state.reportsList,
    login: state.login
  };
};

const connectedInProgressReportListItem = connect(
  mapStateToProps,
  { deleteInProgressReport, setNotification }
)(inProgressReportListItem);

export default connectedInProgressReportListItem;
