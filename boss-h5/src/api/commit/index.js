import request from "../../utils/request";
export const login = (data) => {
  return request({
    url: "/api/user/email-login",
    method: "post",
    data
  })
}
export const getEmailCode = (email)=>{
  return request({
    url:"/api/user/emailCode",
    method:"post",
    data:{
      email
    }
  })
}