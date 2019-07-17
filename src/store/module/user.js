import * as types from '../mutations.js';
import { cookieLogin } from '../../api/user';

const state = {
  user: {}
};

const mutations = {
  //方括号的作用是使得types.SET_CURUSER为一个整体，比秒解析错误
  [types.SET_CURUSER](state, user) {
    state.user = user;
  }
};

const actions = {
  SET_USER({ commit, state }, token) {
    return new Promise((resolve,reject) => {
      cookieLogin(token)
        .then(res => {
          commit(types.SET_CURUSER, res.data[0]);
          resolve();
        })
        .catch(err => {
          throw new Error(err);
          reject();
        })
    })
  }
};

const getters = {

};


export default {
  state,
  getters,
  actions,
  mutations
}
