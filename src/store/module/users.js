import axios from 'axios';
import Swal from 'sweetalert2';

const user = {
  namespaced: true,
  state() {
  },
  mutations: {
  },
  actions: {
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/register', data).then((response) => {
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
            this.$router.push('/');
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  getters: {

  },
};

export default user;
