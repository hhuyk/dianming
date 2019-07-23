import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index'
import login from '../views/login'
import register from '../views/register'
import options from '../views/options'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name :'login',
      component :login
    },
    {
      path:'/register',
      name:'register',
      component :register
    },
    {
      path: '/options',
      name: 'options',
      component: options
    }
  ]
})
