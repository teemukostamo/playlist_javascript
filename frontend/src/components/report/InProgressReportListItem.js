import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import { deleteInProgressReport } from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';

const InProgressReportListItem = ({
  report,
  login,
  deleteInProgressReport,
  setNotification
}) => {
  const [open, setOpen] = useState(false);

  const cancelDelete = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    setOpen(false);
    const params = {
      report_id: report.id,
      user_id: login.id
    };
    deleteInProgressReport(params);
    setNotification(
      `${report.name} ${report.program_date} poistettu!`,
      'success'
    );
  };

  return (
    <React.Fragment>
      <Table.Row>
        <Table.Cell>
          <Link to={`reports/${report.id}`}>{report.name}</Link>
        </Table.Cell>
        <Table.Cell>
          {moment(report.program_date).format('DD.MM.YYYY')}
        </Table.Cell>
        <Table.Cell>{report.program_no}</Table.Cell>
        <Table.Cell>
          {' '}
          <Icon color='red' onClick={() => setOpen(true)} name='delete' />
          <Confirm
            content={`Haluatko varmasti poistaa raportin ${report.name} ${report.program_date}`}
            open={open}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            cancelButton='En sittenkään'
            confirmButton='Joo kyl'
          />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

InProgressReportListItem.propTypes = {
  login: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    level: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number,
    token: PropTypes.string,
    username: PropTypes.string
  }),
  report: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    program_date: PropTypes.string,
    program_no: PropTypes.number
  }),
  deleteInProgressReport: PropTypes.func,
  setNotification: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const connectedInProgressReportListItem = connect(mapStateToProps, {
  deleteInProgressReport,
  setNotification
})(InProgressReportListItem);

export default connectedInProgressReportListItem;
