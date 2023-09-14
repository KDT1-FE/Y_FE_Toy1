import { useEffect, useState } from 'react';
import { auth } from '../common/config';

const useUserDetail = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUid(user.uid);
      } else {
        setIsLogin(false);
        setUid('');
      }
    });
    return () => unsubscribe();
  }, []);

  return { isLogin, setIsLogin, uid, setUid };
};

export default useUserDetail;
