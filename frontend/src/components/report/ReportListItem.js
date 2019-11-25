import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Confirm } from 'semantic-ui-react';
import { getOneReport } from '../../actions/reportActions';
import { deleteReport } from '../../actions/reportsListActions';
import { setNotification } from '../../reducers/notificationReducer';
import moment from 'moment';

const ReportListItem = props => {
  const [open, setOpen] = useState(false);
  const cancelDelete = () => {
    setOpen(false);
  };
  const confirmDelete = () => {
    setOpen(false);
    console.log('clikd delete on report', props.report.id);
    props.deleteReport(props.report.id);
    props.setNotification(
      `${props.report.name} ${props.report.program_date} poistettu!`,
      'success'
    );
  };
  let reportStatusOutPrint;
  let className;

  if (props.report.status === 1) {
    reportStatusOutPrint = 'Valmis';
  } else if (props.report.status === 0) {
    reportStatusOutPrint = 'Keskeneräinen';
  } else if (props.report.status === 9) {
    reportStatusOutPrint = 'Poistettu';
    return null;
  }
  if (props.report.rerun === 1) {
    className = 'rerun';
  }

  if (props.login.level === 1 && props.report.rerun === 1) {
    return null;
  }

  return (
    <React.Fragment>
      <Table.Row className={className}>
        <Table.Cell>{props.report.program_no}</Table.Cell>
        <Table.Cell>
          <Link className={className} to={`reports/${props.report.id}`}>
            {props.report.name}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {moment(props.report.program_date).format('DD.MM.YYYY')}
        </Table.Cell>
        <Table.Cell>
          {props.report.program_start_time.slice(0, -3)} -{' '}
          {props.report.program_end_time.slice(0, -3)}
        </Table.Cell>
        <Table.Cell>{reportStatusOutPrint}</Table.Cell>
        <Table.Cell>
          <Icon
            style={{ color: 'red' }}
            name="delete"
            onClick={() => setOpen(true)}
          />
          <Confirm
            content={`Haluatko varmasti poistaa raportin ${props.report.name} ${props.report.program_date}`}
            open={open}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
          />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  login: state.login
});

const connectedReportListItem = connect(mapStateToProps, {
  getOneReport,
  deleteReport,
  setNotification
})(ReportListItem);

export default connectedReportListItem;
