const authStateDefaultState = {
  authState: 'signIn'
}

export default (state = authStateDefaultState, action) => {
  switch(action.type) {
    case "SET_AUTH_STATE":
      return {...state, authState: action.payload }
    default: 
      return state;
  }
}