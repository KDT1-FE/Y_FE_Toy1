import * as React from 'react';
import { UserCard } from 'components/TimerUserCard/UserCard';
import { Ranking } from 'components/TimerUserCard/Ranking';

export function Study() {
  return (
    <div>
      <Ranking />
      <UserCard />
    </div>
  );
}
