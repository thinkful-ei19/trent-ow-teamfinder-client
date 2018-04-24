import React from 'react';
import './player-card.css';

export default function PlayerCard(props) {
    return (
      <li key={props.id} className="card" onClick={() => props.onClick(props)}>
          {props.userName} {props.skillRating} {props.roles} 
      </li>
    );
}