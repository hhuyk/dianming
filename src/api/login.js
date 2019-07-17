/**
* 登录组件api
*/

import  fetch from '../utils/fetch'

/**
 * 发送请求
 * */
 const sendLogin =  data=>{
   //data 表示需要post的数据
              return new fetch( {
              url :'api/login',
              method:'post',
              data
         })
       }
export default sendLogin

