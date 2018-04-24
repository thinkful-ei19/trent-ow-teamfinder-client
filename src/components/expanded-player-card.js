import React from 'react';
import './expanded-player-card.css';

export default function ExpandedPlayerCard(props) {
    return (
      <li key={props.id} className="card expanded" onClick={() => props.onClick(props)}>
          {props.userName} {props.skillRating} {props.roles} 
      </li>
    );
}