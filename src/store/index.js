import Vue from 'vue';
import Vuex from 'vuex';
import moduleUsers from './module/users';
import moduleAuth from './module/auth';
import moduleProduct from './module/products';
import moduleCategory from './module/category';
import moduleHistory from './module/history'

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      Web_URL : `http://${process.env.VUE_APP_SERVER}`
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users: moduleUsers,
    auth: moduleAuth,
    product: moduleProduct,
    category: moduleCategory,
    history: moduleHistory,
  },
});
