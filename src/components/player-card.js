import React from 'react';
import './player-card.css';

export default function PlayerCard(props) {
    const roles = props.roles.join(', '); 
    return (
      <li key={props.id} className="card" onClick={() => props.onClick(props)}>
          <h1 className="card-title">{props.username}</h1> 
          <h3>Skill Rating: {props.skillRating}</h3>
          Role(s): {roles} 
      </li>
    );
}