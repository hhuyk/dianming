import * as types from '../mutations'
const state = {
  allCls: [], // 所有班级
  curDate: ''

}
const getters = {

}

const mutations = {
  [types.SET_ALLCLS] (state, cls) {
    state.allCls = cls;
  },
  [types.SET_CURDATE] (state, date) {
    state.curDate = date;
  },
  [types.CONCAT_ALLCLS] (state, cls) {
    state.allCls = state.allCls.concat(cls);
  }


}
const actions = {

}

export default {
  state,
  getters ,
  mutations,
  actions
}
