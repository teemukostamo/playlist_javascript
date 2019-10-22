import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedInUser }) => {
  // if logged in user is admin render all nav items
  if (loggedInUser.level === 3) {
    return (
      <nav style={{ marginBottom: '30px' }} className="black">
        <div className="nav-wrapper">
          <NavLink className="brand-logo" to="/">
            PLAYLIST 2020
          </NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/" excact>
                Etusivu
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" excact>
                Raportit
              </NavLink>
            </li>
            <li>
              <a href="#!">Top 100</a>
            </li>
            <li>
              <a href="#!">Haku</a>
            </li>
            <li>
              <NavLink to="/users" excact>
                Käyttäjät
              </NavLink>
            </li>
            <li>
              <a href="#!">Ohjelmat</a>
            </li>
            <li>
              <a href="#!">Omat tiedot</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // if logged in user is not admin render only some items
  return (
    <nav style={{ marginBottom: '30px' }} className="black">
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo">
          <NavLink to="/" excact>
            PLAYLIST 2020
          </NavLink>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/" excact>
              Etusivu
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" excact>
              Raportit
            </NavLink>
          </li>
          <li>
            <a href="#!">Top 100</a>
          </li>
          <li>
            <a href="#!">Haku</a>
          </li>
          <li>
            <a href="#!">Omat tiedot</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
