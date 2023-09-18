import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  doc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
  getDoc,
  orderBy,
  query,
  collection,
} from 'firebase/firestore';
import { db } from 'data/firebase';

export function Ranking() {
  const docRefs = query(
    collection(db, 'User'),
    orderBy('accumulateCount', 'desc'),
  );
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    onSnapshot(docRefs, (querySnapshot) => {
      const rankList: any = [];
      querySnapshot.forEach((doc) => {
        rankList.push(doc.data().nickname);
      });
      setTopThree(rankList.slice(0, 3));
    });
  }, []);

  return (
    <div>
      <h1>Top Three Rankings</h1>
      <ul>
        {topThree.map((nickname, index) => (
          <li key={index}>{nickname}</li>
        ))}
      </ul>
    </div>
  );
}
