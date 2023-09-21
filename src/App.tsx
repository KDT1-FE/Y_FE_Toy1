import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export type Props = {
  email: string;
};

function App() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        const email = user.email;
        if (email !== null) {
          setEmail(email);
        }
      }
    });
  }, []);

  return (
    <>
      <AppRouter email={email} />
    </>
  );
}

export default App;