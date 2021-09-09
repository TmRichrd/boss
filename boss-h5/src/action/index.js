export const setuserAction = (user={}) => {
  console.log(user,'user');
  return {
    type: "set_user",
    user
  }
}