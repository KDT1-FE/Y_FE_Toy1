import { ALERT } from 'constants/common';

export const checkValidate = (endDate: string, startDate: string) => {
  if (new Date(endDate) > new Date(startDate)) {
    alert(ALERT.VALIDATE);
    return false;
  }
  return true;
};
