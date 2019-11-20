import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { setNotification } from '../../reducers/notificationReducer';
import { addTrackToReport } from '../../actions/reportActions';

const AddToCurrentReport = props => {
  const [redirect, setRedirect] = useState(false);
  if (!props.report.reportDetails) {
    return null;
  }
  const onAdd = () => {
    console.log('klikd add', props.track_id);
    const trackToSave = {
      track_id: props.track_id,
      report_id: props.report.reportDetails.id,
      length: props.length,
      sortable_rank: props.report.report.length + 1
    };
    console.log('track to save', trackToSave);
    props.addTrackToReport(trackToSave);
    props.setNotification(
      `${props.track_title} lisätty raporttiin ${props.report.reportDetails.program_name}`,
      'success'
    );
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to={`/reports/${props.report.reportDetails.id}`} />;
  }
  return (
    <React.Fragment>
      <Popup
        trigger={
          <Icon
            style={{ cursor: 'pointer' }}
            color="green"
            onClick={onAdd}
            name="add"
          />
        }
        style={style}
        inverted
        basic
        content={`Lisää kappale ${props.track_title} raporttiin ${props.report.reportDetails.program_name}`}
      />
    </React.Fragment>
  );
};
const style = {
  borderRadius: 0,
  display: 'block',
  opacity: 0.9,
  padding: '2em'
};

const mapStateToProps = state => {
  return {
    report: state.report
  };
};
const connectedAddToCurrentReport = connect(mapStateToProps, {
  setNotification,
  addTrackToReport
})(AddToCurrentReport);

export default connectedAddToCurrentReport;
