import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { setNotification } from '../../reducers/notificationReducer';
import { addTrackToReport } from '../../actions/reportActions';

const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em'
};

const AddToCurrentReport = ({
  report,
  track_id,
  track_title,
  length,
  addTrackToReportConnect,
  setNotificationConnect
}) => {
  const [redirect, setRedirect] = useState(false);
  if (!report.reportDetails) {
    return null;
  }
  const onAdd = () => {
    const trackToSave = {
      track_id,
      report_id: report.reportDetails.id,
      length,
      sortable_rank: report.report.length + 1
    };
    addTrackToReportConnect(trackToSave);
    setNotificationConnect(
      `${track_title} lisätty raporttiin ${report.reportDetails.program_name}`,
      'success'
    );
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to={`/reports/${report.reportDetails.id}`} />;
  }
  return (
    <React.Fragment>
      <Popup
        trigger={
          <Icon
            style={{ cursor: 'pointer' }}
            color='green'
            onClick={onAdd}
            name='add'
          />
        }
        style={style}
        inverted
        basic
        content={`Lisää kappale ${track_title} raporttiin ${report.reportDetails.program_name}`}
      />
    </React.Fragment>
  );
};

AddToCurrentReport.propTypes = {
  report: PropTypes.shape({
    reportDetails: PropTypes.shape({
      program_name: PropTypes.string,
      program_no: PropTypes.number,
      program_dj: PropTypes.string,
      program_date: PropTypes.string,
      program_start_time: PropTypes.string,
      program_end_time: PropTypes.string,
      id: PropTypes.number,
      program_id: PropTypes.number,
      rerun: PropTypes.number,
      status: PropTypes.number,
      user_id: PropTypes.number,
      username: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string
    }),
    report: PropTypes.arrayOf(
      PropTypes.shape({
        sortable_rank: PropTypes.number,
        artist_name: PropTypes.string,
        track_title: PropTypes.string,
        length: PropTypes.number,
        track_id: PropTypes.number,
        artist_id: PropTypes.number,
        album_id: PropTypes.number,
        album_name: PropTypes.string,
        disc_no: PropTypes.number,
        track_no: PropTypes.number,
        cat_id: PropTypes.string,
        country: PropTypes.number,
        isrc: PropTypes.string,
        label: PropTypes.string,
        people: PropTypes.string,
        record_country: PropTypes.string,
        year: PropTypes.string,
        report_track_id: PropTypes.number
      })
    )
  }),
  track_id: PropTypes.number.isRequired,
  track_title: PropTypes.string.isRequired,
  length: PropTypes.number,
  addTrackToReportConnect: PropTypes.func,
  setNotificationConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};
const connectedAddToCurrentReport = connect(mapStateToProps, {
  setNotificationConnect: setNotification,
  addTrackToReportConnect: addTrackToReport
})(AddToCurrentReport);

export default connectedAddToCurrentReport;
