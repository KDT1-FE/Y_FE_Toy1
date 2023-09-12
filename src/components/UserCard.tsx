import * as React from 'react';
import { userObjects } from 'data/getUser';
import { Timer } from 'components/Timer';

// export interface IAppProps {
// }

export function UserCard() {
  return (
    <div>
      {userObjects.map((user) => (
        <>
          <div key={user.id}>
            {user.name}
            <img src={user.photo} alt={user.name + '님의 사진'}></img>
          </div>
          <Timer />
        </>
      ))}
    </div>
  );
}
