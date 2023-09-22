import React, { useEffect } from "react";
import { auth } from "../../libs/firebase";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { authState } from "../../store/sign";
import Main from "../../pages/Main";

const AuthStateChanged = () => {
  const [isSignIn, setIsSignIn] = useRecoilState(authState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });
    return () => unsubscribe();
  }, [setIsSignIn]);

  return null;
};

export default AuthStateChanged;
