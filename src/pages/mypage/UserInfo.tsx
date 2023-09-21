import { useState, ChangeEvent, useEffect } from 'react';
import { auth } from '../../common/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import CommuteTable from '../../components/CommuteTable';
const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const formatDate = (date: string) => {
    const utcDate = new Date(date);
    const kstMilliseconds = 1000;
    const kstSeconds = 60;
    const kstMinutes = 60;
    const kstHours = 9;
    const kstDate = new Date(
      utcDate.getTime() + kstHours * kstMinutes * kstSeconds * kstMilliseconds,
    );
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getUTCDate()).padStart(2, '0');
    const hours = String(kstDate.getUTCHours()).padStart(2, '0');
    const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  const lastSignInTime = user?.metadata.lastSignInTime;
  const lastSign = lastSignInTime ? formatDate(lastSignInTime) : undefined;
  const creationTime = user?.metadata.creationTime;
  const creation = creationTime ? formatDate(creationTime) : undefined;

  return (
    <div>
      <h1>회원 정보</h1>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>
      <p>{lastSign}</p>
      <p>{creation}</p>
      {user?.emailVerified ? <p>이메일 인증 완료</p> : <p>이메일 인증 미완료</p>}
      <CommuteTable></CommuteTable>
    </div>
  );
};

export default UserInfo;
