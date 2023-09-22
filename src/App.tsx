import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

export type Props = {
  uid?: string;
  email: string;
};

function App() {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUid(user.uid);
        const email = user.email;
        if (email !== null) {
          setEmail(email);
        }
      }
    });
  }, []);

  return (
    <>
      <AppRouter uid={uid} email={email} />
    </>
  );
}

export default App;
