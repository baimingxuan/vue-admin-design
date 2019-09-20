import * as types from './tagsNav-type'

const state = {
  displayTags: [],
  cachedTags: []
}

const mutations = {
  [types.ADD_DISPLAY_TAGS] (state, payload) {
    if (state.displayTags.some(item => item.path === payload.path)) return
    state.displayTags.push(
      Object.assign({}, payload, {
        title: payload.meta.title || 'no-name'
      })
    )
  }
}

const actions = {
  addTags ({ dispatch }, payload) {
    dispatch('addDisplayTags', payload)
  },
  addDisplayTags ({ commit }, payload) {
    commit('ADD_DISPLAY_TAGS', payload)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
