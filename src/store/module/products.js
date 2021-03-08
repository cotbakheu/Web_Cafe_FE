import axios from 'axios';
import Swal from 'sweetalert2';

const product = {
  namespaced: true,
  state() {
    return {
      dataProduct: [],
      detailProduct: [],
    };
  },
  mutations: {
    mutationGetProduct(state, payload) {
      state.dataProduct = payload;
    },
    mutationDetailProduct(state, payload) {
      state.detailProduct = payload;
    },
  },
  actions: {
    insertProduct(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/items', data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          console.log(response.data);
          if (response.data.code === 500) {
            Swal.fire({
              text: `${response.data.message}`,
              icon: 'error',
            });
          } else {
            Swal.fire({
              text: `${response.data.message}`,
              icon: 'success',
            });
            resolve(response.data.message);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsGetProduct(context) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/items', { headers: { token: localStorage.getItem('token') } }).then((response) => {
          context.commit('mutationGetProduct', response.data.data);
          resolve(response.data.message);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsGetDetail(context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/items/${id}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          context.commit('mutationDetailProduct', response.data.data);
          resolve(response.data.message);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsDeleteProduct(context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/items/${id}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          console.log(response.data);
          this.$router.push('/');
          resolve(response.data.message);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsUpdateProduct(context, data, id) {
      return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/items/${id}`, data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          console.log(response.data);
          this.$router.push('/');
          resolve(response.data.message);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  getters: {
    getProduct(state) {
      return state.dataProduct;
    },
    detailProduct(state) {
      return state.detailProduct;
    },
  },
};

export default product;
