export const loginAction = (uid, email, image, nickname) => ({
  type: 'LOGIN',
  payload: {
    uid,
    email,
    image,
    nickname,
  },
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});
