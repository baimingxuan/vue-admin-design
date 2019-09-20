import Vue from 'vue'
import Vuex from 'vuex'
import tagsNav from './modules/tagsNav'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsNav
  }
})

export default store
