import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import LoggedInUserInfo from '../user/LoggedInUserInfo';
import CurrentReport from '../report/CurrentReport';
import { logout } from '../../actions/loginActions';

import logo from '../../img/logo.png';

const Navbar = ({ first_name, last_name, login, logoutConnect }) => {
  const getLoggedInUserInfo = () => {
    return <LoggedInUserInfo />;
  };
  const handleLogoutClick = () => {
    logoutConnect();
  };
  const trigger = (
    <span>
      <Icon color='pink' name='user' size='large' /> {first_name} {last_name}
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

  if (login.level === 1) {
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <Menu pointing stackable inverted>
          <Menu.Item link>
            <Link to='/'>
              <Image alt='logo' src={logo} size='small' />
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/reports'>
              <h4>RAPORTIT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/top100'>
              <h4>TOP 100</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/search'>
              <h4>HAKU</h4>
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing='top left'
              icon={null}
            />
          </Menu.Item>
          <Menu.Item>
            <CurrentReport />
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  if (login.level === 2) {
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <Menu pointing stackable inverted>
          <Menu.Item link>
            <Link to='/'>
              <Image alt='logo' src={logo} size='small' />
            </Link>
          </Menu.Item>

          <Menu.Item link>
            <Link to='/reports'>
              <h4>RAPORTIT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/top100'>
              <h4>TOP 100</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/search'>
              <h4>HAKU</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/programs'>
              <h4>OHJELMAT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing='top left'
              icon={null}
            />
          </Menu.Item>
          <Menu.Item>
            <CurrentReport />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
  if (login.level === 3) {
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <Menu pointing stackable inverted>
          <Menu.Item link>
            <Link to='/'>
              <Image alt='logo' src={logo} size='small' />
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/reports'>
              <h4>RAPORTIT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/top100'>
              <h4>TOP 100</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/search'>
              <h4>HAKU</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/transfer'>
              <h4>SIIRTOTIEDOSTOT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/users'>
              <h4>KÄYTTÄJÄT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to='/programs'>
              <h4>OHJELMAT</h4>
            </Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing='top left'
              icon={null}
            />
          </Menu.Item>
          <Menu.Item>
            <CurrentReport />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
};

Navbar.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
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
  logoutConnect: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const connectedNavbar = connect(mapStateToProps, { logoutConnect: logout })(
  Navbar
);

export default connectedNavbar;
