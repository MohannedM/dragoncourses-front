import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import categories from './modules/categories'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    categories
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
})
