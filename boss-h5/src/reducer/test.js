const initState = {
  user:{}
}
export const testReducer = (state = initState, action) => {
  switch (action.type)
  {
    case `test_action`:
      return '默认值'
    case `set_test_action`:
      console.log(state,action);
      return Object.assign({}, state, action)
    default:
      return state;
  }
}