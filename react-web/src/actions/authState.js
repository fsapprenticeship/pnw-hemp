export const changeAuthState = (authState = 'signIn') => ({
  type: 'SET_AUTH_STATE',
  payload: authState
})