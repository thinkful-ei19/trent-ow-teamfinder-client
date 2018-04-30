import React from 'react';

import Checkbox from './checkbox';
import { HERO_LIST, ROLE_LIST} from '../config';

export default function RolesAndHeroes(props) {
    const heroes = HERO_LIST.map((hero,index) => {
        return (<Checkbox key={index} value={hero.name} url={hero.url}/>);
    })

    const roles = ROLE_LIST.map((role,index) => {
        return (<Checkbox key={index} value={role.name} url={role.url}/>);
    })

    return (
      <div>
          <label>Roles: </label>
            {roles}
          <br/><label>Heroes: </label><br/>
            {heroes}
      </div>
    );
  }