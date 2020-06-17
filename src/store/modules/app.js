import Cookies from 'js-cookie'

const state = {
  collapsed: Cookies.get('sideMenuStatus') ? !!+Cookies.get('sideMenuStatus') : false
}

const getters = {
  collapsed: (state, getters) => state.collapsed
}

const mutations = {
  taggleSideMenu (state) {
    state.collapsed = !state.collapsed
    if (state.collapsed) {
      Cookies.set('sideMenuStatus', 1)
    } else {
      Cookies.set('sideMenuStatus', 0)
    }
  },
  closeSideMenu (state) {
    Cookies.set('sidebarStatus', 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
