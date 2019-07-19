/**
 * 全局的ajax
 */

import Axios from 'axios'
// 创建axios实例
const fetch = Axios.create({
  baseURL: 'http://localhost:3000', // api的base_url，这里可以改变请求基础地址
  timeout: 5000,// 请求超时时间,
  // proxy : {
  //   //这里可以使用代理
  //   host: '127.0.0.1',
  //   port: 3000,
  //   // auth: {
  //   //   username: 'mikeymike',
  //   //   password: 'rapunz3l'
  //   // }
  // }
})
export default fetch
