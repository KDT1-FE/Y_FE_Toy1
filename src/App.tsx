import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export type Props = {
  email?: string;
  id: string;
};

function App() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        const email = user.email;
        if (email !== null) {
          setEmail(email);
          setId(email.substring(0, email.indexOf("@", 0)));
        }
      }
    });
  }, []);

  return (
    <>
      <AppRouter id={id} />
    </>
  );
}

export default App;
