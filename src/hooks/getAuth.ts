import { signIn, createUser } from '../utils/util';
import { isLoginSelector } from '../recoil/authRecoil';

interface LoginData {
  value: string;
  expire: number;
}

const loginFunciton = async (
  email: string,
  password: string,
  from: string,
  callback: (props: any) => void,
  callback2: (props: any) => void,
  callback3: (props: string) => void,
) => {
  try {
    const { uid } = await signIn(email, password);
    callback(email);
    callback2(uid);
    callback3(from);
    const obj = {
      enrollEmail: email,
      value: uid,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    localStorage.setItem(`access-${email}`, JSON.stringify(obj));
  } catch (error) {
    callback2('/login');
  }
};

const logoutFunction = () => {
  sessionStorage.clear();
};

const loginDataAlreadyRetrived = (): void => {
  const localStorageData: string | null = localStorage.getItem('accessToken');
  if (typeof localStorageData === 'string') {
    const { value } = JSON.parse(localStorageData) as LoginData;
    sessionStorage.setItem('invalidToken', value);
  }
};

const registerFunction = async (
  email: string,
  password: string,
  callback: (props: any) => void,
  callback2: (props: any) => void,
  callback3: (props: string) => void,
) => {
  try {
    const { uid } = await createUser(email, password);
    callback(email);
    callback2(uid);
    callback3('/');
    const obj = {
      enrollEmail: email,
      value: uid,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    localStorage.setItem(`access-${email}`, JSON.stringify(obj));
  } catch (error) {
    callback2('/register');
  }
};

export {
  loginFunciton,
  logoutFunction,
  registerFunction,
  loginDataAlreadyRetrived,
};
