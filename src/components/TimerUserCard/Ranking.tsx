import React, { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore';
import { db } from 'data/firebase';
import './Ranking.scss';
import { formatTime } from 'data/formatTime';

export function Ranking() {
  const docRefs = query(
    collection(db, 'User'),
    orderBy('accumulateCount', 'desc'),
  );
  const [topThree, setTopThree] = useState<
    { nickname: string; time: number; image: string }[]
  >([]);

  useEffect(() => {
    onSnapshot(docRefs, (querySnapshot) => {
      const rankList: { nickname: string; time: number; image: string }[] = [];

      querySnapshot.forEach((doc) => {
        rankList.push({
          nickname: doc.data().nickname,
          time: doc.data().accumulateCount,
          image: doc.data().image,
        });
      });
      setTopThree(rankList.slice(0, 3));
    });
  }, []);

  return (
    <div className={'user-rank__container'}>
      <h1>👑 Rank 👑</h1>
      <ul className={'user-rank__table'}>
        {topThree.map((entry, index) => (
          <li
            className={`user-rank__username${index + 1}`}
            key={entry.nickname}
          >
            <img src={entry.image}></img>
            <br />
            {entry.nickname}
            <br />
            {formatTime(entry.time)}
          </li>
        ))}
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
