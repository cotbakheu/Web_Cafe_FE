import axios from 'axios';

const category = {
  namespaced: true,
  state() {
    return {
      category: [],
    };
  },
  mutations: {
    mutationGetCategory(state, payload) {
      state.category = payload;
    },
  },
  actions: {
    actionGetCategory(context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVER}/category`).then((response) => {
          context.commit('mutationGetCategory', response.data.data);
          resolve(true);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  getters: {
    getCategory(state) {
      return state.category;
    },
  },
};

export default category;
