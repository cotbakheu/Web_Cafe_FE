<template>
  <div>
    <div class="w-auto shadow-lg" style="height: 100vh">
      <div>
        <router-link to="/" class="pt-5 d-block ml-auto"
          ><img src="../assets/images/fork.png" alt="items"
        /></router-link>
      </div>
      <div>
        <router-link to="/history" class="mt-5 d-block ml-auto"
          ><img src="../assets/images/clipboard.png" alt="items"
        /></router-link>
      </div>
      <div>
        <button
          v-b-modal.modal-center
          to=""
          class="btn btn-outline-light mt-5 d-block ml-auto"
        >
          <img src="../assets/images/add.png" alt="items" />
        </button>
      </div>
      <div>
        <button class="btn" id="signout" @click="onLogout()">
          <i class="fas fa-sign-out-alt" style="font-size: 50px"></i>
        </button>
      </div>
    </div>
    <b-modal hide-footer centered id="modal-center" title="Add Item">
      <form @submit.prevent="onSubmit" action="">
        <div class="form-group d-flex">
          <label
            for="name"
            class="col-2"
            style="font-size: 20px; font-weight: 500"
            >Name</label
          >
          <div class="col-9 d-flex justify-content-start">
            <input
              id="name"
              v-model="form.name"
              class="form-control shadow ml-5"
              type="text"
            />
          </div>
        </div>
        <div class="form-group d-flex">
          <label
            for="name"
            class="col-2"
            style="font-size: 20px; font-weight: 500"
            >Price</label
          >
          <div class="col-9 d-flex justify-content-start">
            <input
              id="name"
              v-model="form.price"
              class="form-control shadow ml-5"
              type="number"
            />
          </div>
        </div>
        <div class="form-group d-flex">
          <label
            class="col-2"
            for="name"
            style="font-size: 20px; font-weight: 500"
            >Image</label
          >
          <div class="ml-3">
            <div
              class="d-flex shadow ml-5 col-6 justify-content-start custom-file"
            >
              <input
                @change="uploadFile($event)"
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label
                v-if="form.image"
                class="custom-file-label"
                for="inputGroupFile01"
                >{{ form.image.name }}</label
              >
              <label v-else class="custom-file-label" for="inputGroupFile01"
                >Choose file</label
              >
            </div>
          </div>
        </div>
        <div class="form-group d-flex">
          <label
            class="col-2"
            for="name"
            style="font-size: 20px; font-weight: 500"
            >Category</label
          >
          <div class="col-5 d-flex justify-content-start">
            <select
              v-model="form.category"
              class="custom-select shadow ml-5"
              id="inputGroupSelect02"
            >
              <option selected>Choose...</option>
              <option
                v-for="category in listCategory"
                :key="category.id"
                :value="category.id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-100 mt-5 d-flex justify-content-end">
          <button class="btn px-4 cancelBtn">Cancel</button>
          <button type="submit" class="btn px-4 ml-3 confirmBtn">Add</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {cafeMixins} from '../helpers/mixins'

export default {
  name: 'Sidebar',
  mixins:[cafeMixins],
  data() {
    return {
      status: true,
      categories: [],
      form: {
        name: '',
        price: '',
        image: '',
        category: '',
      },
    };
  },
  components: {
  },
  mounted() {
    this.actionGetCategory();
  },
  computed: {
    ...mapGetters({
      listCategory: 'category/getCategory',
    }),
  },
  methods: {
    ...mapActions({
      insertProduct: 'product/insertProduct',
      actionGetProduct: 'product/actionsGetProduct',
      actionLogout: 'auth/logout',
      actionGetCategory: 'category/actionGetCategory',
    }),
    uploadFile(e) {
      this.form.image = e.target.files[0];
    },
    onSubmit() {
      const newPrice = Number(this.form.price)
      const fd = new FormData();
      fd.append('name', this.form.name);
      fd.append('price', newPrice);
      fd.append('image', this.form.image);
      fd.append('category', this.form.category);
      this.insertProduct(fd).then((response)=>{
        if (response.code === 500) {
          this.swalPop('Insert Product Failed', 'Wrong Image File', 'error')
        } else {
          this.swalPop('Insert Product Success', '', 'success')
          this.actionGetProduct()
        }
      })
    },
    onLogout() {
      this.actionLogout().then((response) => {
        console.log(response);
        this.$router.push('/login');
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scope>
#sidebar {
  background-color: white;
  width: 100px;
  height: 100vh;
  left: 0;
  display: block;
}
#toggle-btn {
  border: none;
}
.confirm-btn {
  text-decoration: none;
  font-weight: 400;
  padding: 10px 20px;
  background-color: #57cad5;
  border-radius: 5px;
  min-width: 70px;
  color: white;
}
.cancel-btn {
  text-decoration: none;
  font-weight: 400;
  padding: 10px 20px;
  background-color: #f24f8a;
  border-radius: 5px;
  min-width: 70px;
  color: white;
}
.img-url {
  width: 50%;
}
#signout {
  margin-top: 50px;
}
</style>
