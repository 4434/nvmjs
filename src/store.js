import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: {
      pageIndex: 1,
      pageSize: 20,
      pageAll: 0      
    }
  },
  getters: {
    getPage (state) {
      return state.page
    }
  },

  mutations: {
    setPage (state, page) {
      state.page = page
    }
  },
  actions: {}
});
