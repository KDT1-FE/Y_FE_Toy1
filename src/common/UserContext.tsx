import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { auth } from './config';
import { onAuthStateChanged } from 'firebase/auth';

// 사용자 정보의 타입 정의
interface User {
  name: string;
  uid: string;
  email: string;
  photoUrl: string;
  phone: string;
  emailVerified: boolean;
}

// 컨텍스트의 타입 정의
interface UserContextType {
  user: User | null;
  updateUser: (newUser: User | null) => void; // 사용자 정보 업데이트 함수 추가
}

// 초기 컨텍스트 값
const initialContext: UserContextType = {
  user: null,
  updateUser: () => {}, // 빈 함수 초기화
};

const UserContext = createContext<UserContextType>(initialContext);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Firebase 사용자 정보를 사용자 타입으로 변환
        const user: User = {
          name: authUser.displayName || '',
          uid: authUser.uid,
          email: authUser.email || '',
          photoUrl: authUser.photoURL || '',
          phone: authUser.phoneNumber || '',
          emailVerified: authUser.emailVerified,
        };
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
}
