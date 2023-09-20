// actions.js
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

// reducers.js
const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          uid: action.payload.uid,
          email: action.payload.email,
          image: action.payload.image,
          nickname: action.payload.nickname,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
