import React from 'react';
import './expanded-player-card.css';

export default function ExpandedPlayerCard(props) {
    return (
      <li key={props.id} className="card expanded row" onClick={() => props.onClick(props)}>
          <div className="col-12">
            {props.username} {props.skillRating} {props.roles}
          </div>   
      </li>
    );
}