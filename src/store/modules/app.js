import Cookies from 'js-cookie'

const state = {
  collapsed: Cookies.get('sideMenuStatus') ? !!+Cookies.get('sideMenuStatus') : false
}

const getters = {
  collapsed: (state) => state.collapsed
}

const mutations = {
  taggleSideMenu(state) {
    state.collapsed = !state.collapsed
    if (state.collapsed) {
      Cookies.set('sideMenuStatus', 1)
    } else {
      Cookies.set('sideMenuStatus', 0)
    }
  },
  openSideMenu(state) {
    state.collapsed = false
    Cookies.set('sideMenuStatus', 0)
  },
  closeSideMenu(state) {
    state.collapsed = true
    Cookies.set('sideMenuStatus', 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
