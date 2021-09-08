import request from "../../utils/request";
export const getTest = () => {
  return request({
    url: "/api/todos/2",
    method: "get"
  })
}