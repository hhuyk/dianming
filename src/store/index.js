import Vue from 'vue';
import Vuex from 'vuex';
import cls from '../store/module/cls'
import user from '../store/module/user'
Vue.use(Vuex)


export default new Vuex.Store({
     modules :{
       cls,
       user
     }
})
