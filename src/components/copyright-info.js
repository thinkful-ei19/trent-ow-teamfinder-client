import React from 'react';
import './copyright-info.css';

export default function Copyright(props) {
  return (
    <footer className="copyright-footer">
      <div className="copyright-text">
        <p>This site's sole purpose is to demonstrate my abilities
        and has no intention of generating revenue.</p>
        <p>Overwatch™ <br/>
            ®2016 Blizzard Entertainment, Inc. All rights reserved. 
            Overwatch is a trademark or registered trademark of Blizzard Entertainment, Inc. 
            in the U.S. and/or other countries.</p>
      </div>
    </footer>
  );
}