import fetch from '../utils/fetch'
 const cookieLogin = function(token) {
  return new fetch({
    url: '/api/cookieLogin',
    method: 'post',
    data: {
      token
    }
  })
}
/**
 * 设置token的值，以及过期时间
 * cookie的默认生命周期是关闭了浏览器后清除
 */
const setCookie = function({ name, val, time = 1 }) {
  let d = new Date();
  //这里通过expires设置过期时间
  d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${val};expires=${d.toUTCString()}`;
}

/**
 * 检查cookie的值是否存在
 */
//传入一个name ，返回name的值
 const getCookie = function(name) {
  const cookies = document.cookie.split(';');
  let result = null;
  cookies.some((item) => {
    let arr = item.split('=');
    if (arr[0].trim() == name) {
      result = arr[1];
      return;
    }
  });
  return result;
}
export {cookieLogin,setCookie, getCookie}

