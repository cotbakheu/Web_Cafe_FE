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
        axios.get('http://localhost:3000/category').then((response) => {
          context.commit('mutationGetCategory', response.data.data);
          resolve(response.data.message);
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
