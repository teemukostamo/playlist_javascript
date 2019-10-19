import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ marginBottom: '30px' }} className="black">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          PLAYLIST 2020
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="#!">Etusivu</a>
          </li>
          <li>
            <a href="#!">Raportit</a>
          </li>
          <li>
            <a href="#!">Top 100</a>
          </li>
          <li>
            <a href="#!">Haku</a>
          </li>
          <li>
            <a href="#!">Käyttäjät</a>
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
};

export default Navbar;
