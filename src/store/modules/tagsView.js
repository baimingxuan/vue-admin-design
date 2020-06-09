import * as types from './tagsView-types'

const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  [types.ADD_DISPLAY_TAGS] (state, payload) {
    if (state.visitedViews.some(item => item.path === payload.path)) return
    state.visitedViews.push(
      Object.assign({}, payload, {
        title: payload.meta.title || 'no-name'
      })
    )
  },
  addVisitedView (state, payload) {
    if (state.visitedViews.some(item => item.path === payload.path)) return
    state.visitedViews.push(
      Object.assign({}, payload, {
        title: payload.meta.title || 'no-title'
      })
    )
  },
  addCachedViews (state, payload) {
    if (state.cachedViews.includes(payload.name)) return
    if (!payload.meta.noCache) {
      state.cachedViews.push(payload.name)
    }
  },
  delVisitedView (state, payload) {},
  delCachedViews (state, payload) {}
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
