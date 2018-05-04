import React from 'react';
import './player-card.css';

export default function PlayerCard(props) {
    const roles = props.roles.join(', '); 
    return (
      <li role="button" tabIndex="0" key={props.id} className="card" 
        onClick={() => props.onClick(props)}
        onKeyPress={() => props.onClick(props)}>
          <h1 className="card-title">{props.username}</h1> 
          <h2 className="card-skill-rating">Skill Rating: {props.skillRating}</h2>
          Role(s): {roles} 
      </li>
    );
}