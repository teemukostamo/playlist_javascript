import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrent } from '../../actions/userActions';

const User = props => {
  const onDelete = () => {
    console.log(`klikd delete on user ${props.user.id}`);
  };

  return (
    <tr>
      <td>
        <a
          href="#edit-user-modal"
          className="modal-trigger"
          onClick={() => props.setCurrent(props.user)}
        >
          {props.user.username}
        </a>
      </td>
      <td>
        {props.user.first_name} {props.user.last_name}
      </td>
      <td>
        <Moment format="MMMM Do YYYY, h:mm:ss a">{props.user.last_seen}</Moment>
      </td>
      <td>{props.user.level}</td>
      <td>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </td>
    </tr>
  );
};

const mapDispatchToProps = {
  setCurrent
};

const connectedUser = connect(
  null,
  mapDispatchToProps
)(User);

export default connectedUser;
