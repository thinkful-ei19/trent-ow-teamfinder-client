import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar(props) {
    return (
      <nav>
          <Link to='/auth/players'>Players </Link>
          <Link to='/auth/account'>Account</Link>
      </nav>
    );
}