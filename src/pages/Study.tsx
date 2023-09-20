import * as React from 'react';
import { Timer } from 'components/TimerUserCard/Timer';
import { UserCard } from 'components/TimerUserCard/UserCard';
import { Ranking } from 'components/TimerUserCard/Ranking';
import { userObjects } from 'data/getUser';

export function Study() {
  return (
    <div>
      <Ranking />
      <UserCard />
    </div>
  );
}
