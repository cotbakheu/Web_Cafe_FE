<template>
  <div class="login" style="height: 100vh">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="">
        <h1 class="d-block text-light mt-5">Welcome to Web Cafe</h1>
      </div>
      <form
        action=""
        @submit.prevent="onSubmit"
        class="w-sm-50 p-4 h-auto mt-5 shadow form-login"
      >
        <h2 class="mb-5">REGISTER</h2>
        <div class="form-group d-flex align-items-center">
          <label for="email" class="col-md-3 col-2">Email: </label>
          <input
            type="email"
            v-model="form.email"
            class="form-control shadow ml-5 w-50"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group d-flex align-items-center">
          <label for="password" class="col-md-3 col-2">Password: </label>
          <input
            type="password"
            v-model="form.password"
            class="form-control shadow ml-5 w-50"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group d-flex align-items-center">
          <label for="username" class="col-md-3 col-2">Username: </label>
          <input
            type="text"
            v-model="form.username"
            class="form-control shadow ml-5 w-50"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group d-flex align-items-center">
          <label for="username" class="col-md-3 col-2">Role: </label>
          <!-- <input
            type="text"
            class="form-control shadow ml-5 w-50"
            id="username"
            placeholder="Username"
          /> -->
          <select
            v-model="form.access"
            class="form-control shadow ml-5 w-50"
            required
          >
            <option value="0">Admin</option>
            <option value="1">Kasir</option>
          </select>
        </div>
        <div
          class="d-flex justify-content-md-end justify-content-center ml-5 w-50"
        >
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </div>
        <hr />
        <p>
          Already have an account?
          <router-link to="/login">Login here!</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import {cafeMixins} from '../helpers/mixins'

export default {
  mixins: [cafeMixins],
  data() {
    return {
      form: {
        username:'',
        email: '',
        password: '',
        access: '',
      },
    };
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    onSubmit() {
      this.swalLoading('Processing Register')
      const access = Number(this.form.access);
      const data = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        access,
      };
      this.register(data).then((response) => {
        if (response.code === 500) {
          this.swalPop('Register Failed', response.message, 'error')
          this.swalClose()
        }else {
          this.swalPop('Register Success', '', 'success')
          this.linkTo('login')
          this.swalClose()
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scope>
.login {
  position: relative;
  background: url("../assets/images/login-bg.jpg");
  background-size: cover;
  background-repeat: repeat-y;
  z-index: 0;
}
.login h1 {
  position: relative;
  z-index: 3;
}
.login::after {
  position: absolute;
  display: block;
  content: "";
  background-color: rgba(1, 1, 1, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
form {
  position: relative;
  z-index: 4;
  background-color: white;
}
.form-login {
  border-radius: 10px;
}
</style>
