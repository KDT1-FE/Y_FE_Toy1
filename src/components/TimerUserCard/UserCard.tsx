import * as React from 'react';
import { userObjects } from 'data/getUser';
import { Timer } from 'components/TimerUserCard/Timer';

// export interface IAppProps {
// }

export function UserCard() {
  return (
    <div>
      {userObjects.map((user) => (
        <div key={user.id}>
          <div>
            {user.nickname}
            <img src={user.image} alt={user.nickname + '님의 사진'}></img>
          </div>
          <Timer id={user.id} />
        </div>
      ))}
    </div>
  );
}
