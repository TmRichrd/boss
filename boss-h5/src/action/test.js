export const test = () => {
  return {
    type: "test_action"
  }
}
export const settest = (user = {}) => {
  return {
    type: "set_test_action",
    user
  }
}