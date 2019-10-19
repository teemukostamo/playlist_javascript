import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const User = props => {
  const onDelete = () => {
    console.log(`klikd delete on user ${props.user.id}`);
  };
  return (
    <tr>
      <td>{props.user.username}</td>
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

const connectedUser = connect(null)(User);

export default connectedUser;
