import React from 'react';
import { connect } from 'react-redux';
import LoggedInUserInfo from '../user/LoggedInUserInfo';
import CurrentReport from '../report/CurrentReport';
import { logout } from '../../actions/loginActions';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import logo from '../../img/logo.png';

const Navbar = props => {
  const getLoggedInUserInfo = () => {
    return <LoggedInUserInfo />;
  };
  const handleLogoutClick = () => {
    console.log('klikd logout');
    props.logout();
  };
  const trigger = (
    <span>
      <Icon color="pink" name="user" size="large" /> {props.first_name}{' '}
      {props.last_name}
    </span>
  );
  const options = [
    {
      key: 'user',
      text: <LoggedInUserInfo />,
      icon: 'user',
      onClick: getLoggedInUserInfo
    },
    {
      key: 'sign-out',
      text: 'Kirjaudu ulos',
      icon: 'sign out',
      onClick: handleLogoutClick
    }
  ];

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <Menu pointing stackable inverted>
        <Menu.Item link>
          <Link to="/">
            <Image alt="logo" src={logo} size="small" />
          </Link>
        </Menu.Item>

        <Menu.Item link>
          <Link to="/reports">
            <h4>RAPORTIT</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/top100">
            <h4>TOP 100</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/search">
            <h4>HAKU</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/transfer">
            <h4>SIIRTOTIEDOSTOT</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">
            <h4>KÄYTTÄJÄT</h4>
          </Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/programs">
            <h4>OHJELMAT</h4>
          </Link>
        </Menu.Item>
        <Menu.Item style={{ align: 'right' }}>
          <Dropdown
            trigger={trigger}
            options={options}
            pointing="top left"
            icon={null}
          />
        </Menu.Item>
        <CurrentReport />
      </Menu>
    </div>
  );
};

export default connect(null, { logout })(Navbar);
