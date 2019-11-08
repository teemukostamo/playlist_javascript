import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteInProgressReport } from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';
import { Table, Icon, Loader, Dimmer, Confirm } from 'semantic-ui-react';

const InProgressReportListItem = ({
  report,
  reportsList,
  login,
  deleteInProgressReport,
  setNotification
}) => {
  const [open, setOpen] = useState(false);
  if (reportsList.loading === true) {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }

  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    const params = {
      report_id: report.id,
      user_id: login.id
    };
    console.log(`klikd delete on report`, params);
    deleteInProgressReport(params);
    console.log('clikd delete on report', report.id);
    setNotification(
      `${report.name} ${report.program_date} poistettu!`,
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
          <Icon color="red" onClick={() => setOpen(true)} name="delete" />
          <Confirm
            content={`Haluatko varmasti poistaa raportin ${report.name} ${report.program_date}`}
            open={open}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
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
)(InProgressReportListItem);

export default connectedInProgressReportListItem;
