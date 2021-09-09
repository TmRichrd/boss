let initState = {
  user: {}
}
export const userReducer = (state = initState, action) => {
  switch (action.type)
  {
    case `set_user`:
      console.log('reducer', state, action);
      return Object.assign({}, state, action)
    default:
      return state;
  }
}