export const formatPhoneNumber = (phoneNumber: string) => {
  const numbersOnly = phoneNumber.replace(/\D/g, '');
  if (numbersOnly.startsWith('82')) {
    return '0' + numbersOnly.substring(2);
  }
  return phoneNumber;
};
