import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Checkbox, Form } from 'semantic-ui-react';
import {
  deleteTrackFromReport,
  checkForDelete,
  unCheckForDelete
} from '../../actions/reportActions';

const ReportWithTracksItem = props => {
  const [checked, setChecked] = useState(false);
  console.log(checked);
  console.log('report with tracks item props', props);
  const onDelete = () => {
    const params = {
      report_track_id: props.track.report_track_id,
      report_id: props.report.reportDetails.id
    };
    console.log(params);
    props.deleteTrackFromReport(params);
    console.log('klikd delete');
  };
  const onEdit = () => {
    console.log('klikd edit');
  };

  const checkedClick = () => {
    setChecked(!checked);
    if (checked === true) {
      console.log('removing id from delete array', props.track.report_track_id);
      props.unCheckForDelete(props.track.report_track_id);
    } else {
      console.log('checked for delete id', props.track.report_track_id);
      props.checkForDelete(props.track.report_track_id);
    }
  };
  const minutes = Math.floor(props.track.length / 60);
  const seconds = props.track.length - minutes * 60;

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox onChange={checkedClick} checked={checked} />
        <Icon
          style={{ marginLeft: '1.5rem' }}
          onClick={onEdit}
          name="arrows alternate"
        />
      </Table.Cell>
      <Table.Cell>{props.track.sortable_rank}</Table.Cell>
      <Table.Cell>{props.track.artist_name}</Table.Cell>
      <Table.Cell>{props.track.track_title}</Table.Cell>
      <Table.Cell>
        {minutes}:{seconds}
      </Table.Cell>
      <Table.Cell>
        <Icon onClick={onDelete} name="delete" />
      </Table.Cell>
      <Table.Cell>
        <Icon onClick={onEdit} name="edit" />
      </Table.Cell>
    </Table.Row>
  );
};

const mapStateToProps = state => {
  return {
    report: state.report,
    reportsList: state.reportsList,
    notification: state.notification
  };
};

const connectedReportWithTracksItem = connect(
  mapStateToProps,
  { deleteTrackFromReport, checkForDelete, unCheckForDelete }
)(ReportWithTracksItem);

export default connectedReportWithTracksItem;
