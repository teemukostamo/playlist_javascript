import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown, Form, Input } from 'semantic-ui-react';
import {
  filterByUserId,
  filterByStatus,
  filterByText
} from '../../actions/reportsListActions';

const FilterReportList = ({
  users,
  login,
  filterByUserIdConnect,
  filterByStatusConnect,
  filterByTextConnect
}) => {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    filterByUserIdConnect(userId);
    filterByStatusConnect(status);
    filterByTextConnect(filterText);
    // eslint-disable-next-line
  }, [userId, status, filterText]);

  if (users.users === null) {
    return (
      <div>
        <span>Ladataan...</span>
      </div>
    );
  }

  const userOptions = users.users.map(user => ({
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
  };
  const getStatus = (event, { value }) => {
    event.preventDefault();
    setStatus(value);
    filterByStatusConnect(status);
  };
  const getFilteredByText = (event, { value }) => {
    event.preventDefault();
    setFilterText(value);
    filterByTextConnect(filterText);
  };

  const filterByUser = () => {
    if (login.level === 1) {
      return null;
    }
    return (
      <Form.Field>
        <Dropdown
          placeholder='Käyttäjä'
          openOnFocus
          selection
          search
          options={addAllToUserOptions}
          onChange={getUser}
        />
      </Form.Field>
    );
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field>
          <Input
            type='text'
            placeholder='Tekstisuodatus'
            onChange={getFilteredByText}
          />
        </Form.Field>
        {filterByUser()}
        <Form.Field>
          <Dropdown
            placeholder='Tila'
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

FilterReportList.propTypes = {
  filterByStatusConnect: PropTypes.func,
  filterByTextConnect: PropTypes.func,
  filterByUserIdConnect: PropTypes.func,
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
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string,
        last_name: PropTypes.string
      })
    )
  })
};

const mapStateToProps = state => {
  return {
    report: state.report,
    reportsList: state.reportsList,
    users: state.users,
    login: state.login
  };
};

const mapDispatchToProps = {
  filterByUserIdConnect: filterByUserId,
  filterByStatusConnect: filterByStatus,
  filterByTextConnect: filterByText
};

const connectedFilterReportList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterReportList);

export default connectedFilterReportList;
