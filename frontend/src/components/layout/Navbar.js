import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import logo from '../../img/logo.png';

const Navbar = () => {
  return (
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
        <Link to="/">
          <h4>TOP 100</h4>
        </Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/">
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
        <Link to="/">
          <h4>OHJELMAT</h4>
        </Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/">
          <h4>OMAT TIEDOT</h4>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
