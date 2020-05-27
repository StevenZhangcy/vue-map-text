import axios from 'axios'

const Http = {}

Http.install = function (Vue) {
  // 4. 添加实例方法
  axios.defaults.baseURL = ''
  axios.defaults.withCredentials = false
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    // console.log(config.url)
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default Http

// // ----------------------------
// MyPlugin.install = function (Vue, options) {
//   // 4. 添加实例方法
//   Vue.prototype.$myMethod = function (methodOptions) {
//     // 逻辑...
//   }
// }