import axios from 'axios';

const auth = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    login(context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVER}/login`, data).then((response) => {
          // console.log(response);
          if (response.data.code === 500) {
            resolve(response.data)
          }
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('email', response.data.data.email);
          localStorage.setItem('id', response.data.data.id);
          localStorage.setItem('access', response.data.data.access);
          localStorage.setItem('username', response.data.data.username);
          context.commit('setToken', response.data.token);
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVER}/register`, data).then((response)=> {
          resolve(response.data)
        }).catch((err)=>{
          reject(err)
        })
      })
    },
    logout() {
      return new Promise((resolve) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('access');
        localStorage.removeItem('username');
        resolve(true);
      });
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
};

export default auth;
