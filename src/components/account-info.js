import React from 'react';
import {ROLE_LIST, HERO_LIST} from '../config';
import './account-info.css';

function isDeleteMode(props) {
  if (!props.deleteAccountMode) {
    return (
        <button className="delete-button" 
                onClick={() => props.toggleDeleteOnClick()}>Delete Account</button>
    );
  } else {
    return (
        <div className="delete-box">
            <p>Are you sure you want to delete your account?</p>
            <button className="yes-button" 
                onClick={() => props.deleteOnClick()}>Yes</button> 
            <button onClick={() => props.toggleDeleteOnClick()}>No</button>
        </div>
    );
  }
}

export default function AccountInfo(props) {
    const roles = ROLE_LIST.filter(role => props.currentUser.roles.includes(role.name)).map(role => {
        return (
            <div key={role.name} className="img-wrapper">
                <img title={role.name} src={role.url} alt={role.name}/>
            </div>   
        );
    }); 
    const heroes = HERO_LIST.filter(hero => props.currentUser.heroPool.includes(hero.name)).map(hero => {
        return (
            <div key={hero.name} className="img-wrapper">
                <img title={hero.name} src={hero.url} alt={hero.name}/>
            </div>   
        );
    });

    return (
        <li key={props.currentUser.id} className="card expanded">
            <h1>{props.currentUser.username}</h1>
            <h2> Skill Rating: {props.currentUser.skillRating}</h2>
            <p>Email: {props.currentUser.email}</p>
            Roles:  
            <div className="container expanded-container">
               {roles}
            </div>
            Heroes: 
            <div className="container expanded-container">
              {heroes}
            </div>
            <button onClick={() => props.toggleEditOnClick()}>Edit Account</button><br/>
            {isDeleteMode(props)}
        </li>
      );

}