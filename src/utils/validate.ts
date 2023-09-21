import { VALIDATE_ALERT } from 'constants/alert';

export const checkValidate = (endDate: string, startDate: string) => {
  if (new Date(endDate) > new Date(startDate)) {
    alert(VALIDATE_ALERT);
    return false;
  }
  return true;
};
