export const getSessionUserData = () => {
  for (const key of Object.keys(sessionStorage)) {
    if (key.includes('firebase:authUser:') && key) {
      const user = sessionStorage.getItem(key);
      if (user) return JSON.parse(user);
    }
  }
};
