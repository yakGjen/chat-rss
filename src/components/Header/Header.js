import React  from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

/*const links = [
  {to: '/', label: 'Home', exact: 'true'},
  {to: 'auth', label: 'Auth', exact: false},
  {to: 'registration', label: 'Registration', exact: false},
];*/

const Header = (props) => (
  <header className='header'>
    <Link
      to={'/'}
      exact='true'
      className='header-link'
    >
      <h1>Chat-RSS</h1>
    </Link>
    <div>
      <Link
        to={'/auth'}
        exact='false'
        className='header-button-link'
      >
        <button onClick={props.closeConnection} className='header-button'>{props.log}</button>
      </Link>
      <Link
        to={'/registration'}
        exact='false'
        className='header-button-link'
      >
        <button className='header-button'>Registration</button>
      </Link>
    </div>
  </header>
);

export default Header;