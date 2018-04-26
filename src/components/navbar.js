import React from 'react';

export default function NavBar(props) {
    return (
      <nav>
          <Link to='/auth/players'>Players</Link>
          <Link to='/auth/account'>Account</Link>
      </nav>
    );
}