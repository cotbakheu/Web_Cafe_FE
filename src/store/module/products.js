import axios from 'axios';
// import Swal from 'sweetalert2';

const product = {
  namespaced: true,
  state() {
    return {
      dataProduct: {},
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
        axios.post(`${process.env.VUE_APP_SERVER}/items`, data, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response.data)  
          resolve(response.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    actionsGetProduct(context, search='a', sort='asc', params='name') {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVER}/items?search=${search}&sort=${sort}&params=${params}`, { headers: { token: localStorage.getItem('token') } }).then((response) => {
          // console.log(response)
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
