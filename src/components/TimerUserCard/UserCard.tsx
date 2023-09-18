import * as React from 'react';
import { userObjects } from 'data/getUser';
import { Timer } from 'components/TimerUserCard/Timer';
import './UserCard.scss';

export function UserCard() {
  return (
    <div className="user-card__container">
      {userObjects.map((user) => (
        <div className="user-card" key={user.id}>
          <div>
            <img src={user.image} alt={user.nickname + '님의 사진'}></img>
            <div className="name">{user.nickname}</div>
          </div>
          <Timer id={user.id} />
        </div>
      ))}
    </div>
  );
}
