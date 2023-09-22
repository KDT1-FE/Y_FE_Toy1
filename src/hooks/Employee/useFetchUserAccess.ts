import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";

export default function useFetchUserAccess() {
  const [userAccess, setUserAccess] = useState<string>();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const firebaseUser = auth.currentUser;

    if (firebaseUser) {
      const userId = firebaseUser.uid;
      const userRef = doc(db, "Users", userId);
      try {
        (async () => {
          const docSn = await getDoc(userRef);
          if (docSn.exists()) {
            const userData = docSn.data();
            const access = userData?.access;
            setUserAccess(access);
          }
        })();
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        setNotified(true);
      }
    }
  }, []);

  const checkAdminPermission = () => {
    if (userAccess !== "admin") {
      return false;
    }
    return true;
  };

  return {
    userAccess,
    checkAdminPermission,
    notified,
  };
}
