import React from 'react';
import './expanded-player-card.css';

export default function AccountInfo(props) {
    return (
        <li key={props.currentUser.id} className="card expanded">
            {props.currentUser.username} {props.currentUser.skillRating} {props.currentUser.roles} {props.currentUser.heroPool}
            <button onClick={() => props.deleteOnClick()}>Delete</button> <button onClick={() => props.toggleEditOnClick()}>Edit</button>
        </li>
    );
}