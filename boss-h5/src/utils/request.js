import axios from "axios"
const request = axios.create({
  timeout: 10000,
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['token'] = localStorage.getItem('token') || ''
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (res) {
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default request;