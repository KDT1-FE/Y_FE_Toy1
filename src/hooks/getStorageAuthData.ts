import React from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../recoil/authRecoil';

const findAccesKey = () => {
  const allKeys = Object.keys(localStorage);
  const filteredKeys = allKeys.filter(key => {
    return key.startsWith('access-');
  });
  return filteredKeys;
};

const isLenghtValid = (isLocalStorage: number) => {
  if (isLocalStorage === 0) {
    return false;
  }
  return true;
};

const findLocalStorageKey = (storageLength: number, keys: string[]) => {
  for (let i = 0; i < storageLength; i += 1) {
    const key = keys[i];
    if (key) {
      const value = localStorage.getItem(key);
      const { expire } = JSON.parse(value as string);
      if (expire < Date.now()) {
        localStorage.removeItem(key);
      }
    }
  }
  if (storageLength > 0) {
    return true;
  }
  return false;
};

const getLocalData = () => {
  const isLocalStorage = localStorage.length;
  if (isLocalStorage > 0) {
    const keys = findAccesKey();
    if (isLenghtValid(keys.length)) {
      return findLocalStorageKey(keys.length, keys);
    }
  }
  return false;
};

const getSessionData = () => {
  const value = useRecoilValue(isLoginSelector);
  if (value) {
    return true;
  }
  return false;
};

export { getLocalData, getSessionData, findAccesKey };
