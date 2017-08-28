import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './action'
// import getters from './getters'

Vue.use(Vuex)

const state = {
  curTab: '' // 当前tab
}

export default new Vuex.Store({
  state
  // state,
  // getters,
  // actions,
  // mutations,
})
