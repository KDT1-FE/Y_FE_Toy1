import React from "react";
// firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../libs/firebase";
// recoil
import { useRecoilState } from "recoil";
import { emailState, modalState, passwordState } from "../../store/sign";
// custom hook
import { useNavigation } from "./useNavigation";
// style
import swal from "sweetalert";

export const useSign = () => {
  const { moveMain, moveStartRegister } = useNavigation();
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [isEmailModalOpen, setEmailModalOpen] = useRecoilState(modalState);
  // Email, Password 입력
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // 로그인 기능
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userUid = user.uid;
      const userDocRef = doc(db, "Users", userUid);
      const userDocSnapShot = await getDoc(userDocRef);
      if (userDocSnapShot.exists()) {
        const userInfo = userDocSnapShot.data();
        const userData = {
          newUser: userInfo,
          userUid: userUid,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        moveMain();
      } else {
        console.log("정보 입력 단계 시작");
        setEmailModalOpen(false);
        moveStartRegister();
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      swal("Fail", "회원가입부터 진행해주세요!", "error");
    }
  };
  // 회원가입 기능
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("회원가입 성공:", user);
      swal("회원가입 성공", "회원가입 완료되었습니다!", "success").then(() => {
        moveStartRegister();
      });
    } catch (error) {
      console.error("로그인 실패:", error);
      swal("Fail", "이미 사용중인 계정입니다!", "error");
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
    handleSignUp,
  };
};
