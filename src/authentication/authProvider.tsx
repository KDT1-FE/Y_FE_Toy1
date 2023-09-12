import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { auth } from "../firebase";

type IChildren = {
  children : React.JSX.Element
}

const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(fbUser => {
      console.log(`구독 실행`, fbUser);
      setUser(fbUser);
    });
    return subscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;