import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';
import { deleteTrackFromReport } from '../../actions/reportActions';

const ReportWithTracksItem = props => {
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
  const minutes = Math.floor(props.track.length / 60);
  const seconds = props.track.length - minutes * 60;

  return (
    <Table.Row>
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
  { deleteTrackFromReport }
)(ReportWithTracksItem);

export default connectedReportWithTracksItem;
