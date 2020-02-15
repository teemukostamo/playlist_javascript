import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Confirm, Responsive } from 'semantic-ui-react';
import moment from 'moment';
import { deleteReport } from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';

const ReportListItem = ({ deleteReport, setNotification, login, report }) => {
  const [open, setOpen] = useState(false);
  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    deleteReport(report.id);
    setNotification(
      `${report.name} ${report.program_date} poistettu!`,
      'success'
    );
  };
  let reportStatusOutPrint;
  let className;

  if (report.status === 1) {
    reportStatusOutPrint = 'Valmis';
  } else if (report.status === 0) {
    reportStatusOutPrint = 'Keskeneräinen';
  } else if (report.status === 9) {
    reportStatusOutPrint = 'Poistettu';
    return null;
  }
  if (report.rerun === 1) {
    className = 'rerun';
  }

  if (login.level === 1 && report.rerun === 1) {
    return null;
  }

  return (
    <React.Fragment>
      <Table.Row className={className}>
        <Responsive as={Table.Cell} minWidth={768}>
          {report.program_no}
        </Responsive>
        <Table.Cell>
          <Link className={className} to={`reports/${report.id}`}>
            {report.name}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {moment(report.program_date).format('DD.MM.YYYY')}
        </Table.Cell>
        <Table.Cell>
          {report.program_start_time.slice(0, -3)} -{' '}
          {report.program_end_time.slice(0, -3)}
        </Table.Cell>
        <Table.Cell>{reportStatusOutPrint}</Table.Cell>
        <Table.Cell>
          <Icon
            style={{ color: 'red' }}
            name='delete'
            onClick={() => setOpen(true)}
          />
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

ReportListItem.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    program_date: PropTypes.string,
    program_dj: PropTypes.string,
    program_end_time: PropTypes.string,
    program_no: PropTypes.number,
    program_start_time: PropTypes.string,
    rerun: PropTypes.number,
    status: PropTypes.number,
    user_id: PropTypes.number
  }).isRequired,
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
  }).isRequired,
  deleteReport: PropTypes.func,
  setNotification: PropTypes.func
};

const mapStateToProps = state => ({
  login: state.login
});

const connectedReportListItem = connect(mapStateToProps, {
  deleteReport,
  setNotification
})(ReportListItem);

export default connectedReportListItem;
