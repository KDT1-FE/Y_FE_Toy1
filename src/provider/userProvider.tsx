import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./userContext";
import { auth } from "../firebase";

interface IChildren {
  children : React.JSX.Element
}

const AuthProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(fbUser => {
      setUser(fbUser);
    });
    return subscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;