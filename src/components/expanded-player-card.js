import React from 'react';
import {HERO_LIST, ROLE_LIST} from '../config';
import './expanded-player-card.css';

export default function ExpandedPlayerCard(props) {
    const roles = ROLE_LIST.filter(role => props.currentUser.roles.includes(role.name)).map(role => {
        return (
            <div key={role.name} className="img-wrapper">
                <img src={role.url} alt={role.name}/>
            </div>   
        );
    }); 
    const heroes = HERO_LIST.filter(hero => props.currentUser.heroPool.includes(hero.name)).map(hero => {
        return (
            <div key={hero.name} className="img-wrapper">
                <img src={hero.url} alt={hero.name}/>
            </div>   
        );
    });
    return (
      <li className="card expanded" >
          <button className="minimize-button" onClick={() => props.onClick(props)}>X</button>
          <h1>{props.currentUser.username}</h1>
          <h3> Skill Rating: {props.currentUser.skillRating}</h3>
          Roles:  
          <div className="container expanded-container">
             {roles}
          </div>
          Heroes: 
          <div className="container expanded-container">
            {heroes}
          </div>
      </li>
    );
}