import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  filterByUserId,
  filterByStatus,
  filterByText
} from '../../actions/reportsListActions';
import { Dropdown, Form, Input } from 'semantic-ui-react';

const FilterReportList = props => {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    props.filterByUserId(userId);
    props.filterByStatus(status);
    props.filterByText(filterText);
    console.log('user id', userId);
    console.log('filterText', filterText);
    console.log('status', status);
    // eslint-disable-next-line
  }, [userId, status, filterText]);

  const userOptions = props.users.users.map(user => ({
    key: user.id,
    text: `${user.first_name} ${user.last_name}`,
    value: user.id
  }));

  const addAllToUserOptions = [
    {
      key: 0,
      text: 'Kaikki',
      value: null
    },
    ...userOptions
  ];
  // status options
  const statusOptions = [
    {
      key: '2',
      text: 'Kaikki',
      value: null
    },
    {
      key: '0',
      text: 'Keskeneräinen',
      value: 0
    },
    {
      key: '1',
      text: 'Valmis',
      value: 1
    }
  ];

  const getUser = (e, { value }) => {
    e.preventDefault();
    setUserId(value);
    // console.log('user id', userId);
    // props.filterByUserId(userId);
  };
  const getStatus = (event, { value }) => {
    event.preventDefault();
    setStatus(value);
    console.log('tila', status);
    props.filterByStatus(status);
  };
  const getFilteredByText = (event, { value }) => {
    event.preventDefault();
    setFilterText(value);
    props.filterByText(filterText);
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field>
          <Input
            type="text"
            placeholder="Tekstisuodatus"
            onChange={getFilteredByText}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            placeholder="Käyttäjä"
            openOnFocus
            selection
            options={addAllToUserOptions}
            onChange={getUser}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            placeholder="Tila"
            openOnFocus
            selection
            options={statusOptions}
            onChange={getStatus}
          />{' '}
        </Form.Field>
        <Form.Field></Form.Field>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = state => {
  console.log('reportfilterform state to props', state);
  return {
    report: state.report,
    reportsList: state.reportsList,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const mapDispatchToProps = {
  filterByUserId,
  filterByStatus,
  filterByText
};

const connectedFilterReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterReportList);

export default connectedFilterReportList;
