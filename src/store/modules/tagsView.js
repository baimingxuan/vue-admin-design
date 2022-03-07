const state = {
  visitedViews: []
}

const getters = {
  visitedViews: (state) => state.visitedViews
}

const mutations = {
  addVisitedView(state, view) {
    if (state.visitedViews.some(item => item.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-title'
      })
    )
  },
  delVisitedView(state, view) {
    const index = state.visitedViews.findIndex(item => {
      return item.path === view.path
    })
    state.visitedViews.splice(index, 1)
  },
  delAllVisitedView(state) {
    const fixedTags = state.visitedViews.filter(item => item.meta.fixed)
    state.visitedViews = fixedTags
  },
  delOthersVisitedView(state, view) {
    state.visitedViews = state.visitedViews.filter(item => {
      return item.meta.fixed || item.path === view.path
    })
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations
}
