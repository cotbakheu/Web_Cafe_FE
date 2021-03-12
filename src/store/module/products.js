import axios from 'axios';
// import Swal from 'sweetalert2';

const product = {
  namespaced: true,
  state() {
    return {
      dataProduct: {},
      detailProduct: {},
      pagination: {}
    };
  },
  mutations: {
    mutationGetProduct(state, payload) {
      state.dataProduct = payload;
    },
    mutationDetailProduct(state, payload) {
      state.detailProduct = payload;
    },
    mutationPagination(state, payload) {
      state.pagination = payload;
    },
  },
  actions: {
    insertProduct(context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVER}/items`, data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          console.log(response.data)  
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsGetProduct(context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVER}/items?search=${data.search}&sort=${data.sort}&params=${data.params}&page=${data.page}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response)
          context.commit('mutationGetProduct', response.data.data);
          context.commit('mutationPagination', response.data.pagination)
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsGetDetail(context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVER}/items/${id}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response.data.data[0])
          context.commit('mutationDetailProduct', response.data.data[0]);
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsDeleteProduct(context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_SERVER}/items/${id}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response.data);
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsUpdateProduct(context, data) {
      console.log(data.fd)
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_SERVER}/items/${data.id}`, data.fd, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response);
          resolve(response.data);
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
    getPagination(state) {
      return state.pagination;
    },
  },
};

export default product;
