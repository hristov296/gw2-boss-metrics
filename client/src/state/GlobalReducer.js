

const GlobalReducer = (state, action) => {
  console.log('are u getting it');
  console.log(state, action);
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        username: '',
        userId: '',
      }
    default:
      return state;
  }
}

export default GlobalReducer