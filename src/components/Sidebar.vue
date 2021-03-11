<template>
  <div>
    <div>
      <div>
        <router-link to="/" class="pt-5 d-flex ml-auto justify-content-center"
          ><img src="../assets/images/fork.png" alt="items" />
          <h3 class="d-block d-md-none text-decoration-none text-dark ml-4">
            Menu
          </h3>
        </router-link>
      </div>
      <div>
        <router-link
          to="/history"
          class="mt-5 d-flex ml-auto justify-content-center"
          ><img src="../assets/images/clipboard.png" alt="items" />
          <h3 class="d-block text-decoration-none text-dark d-md-none ml-3">
            History
          </h3>
        </router-link>
      </div>
      <div @click="modal" class="mt-5 d-flex justify-content-center">
        <img src="../assets/images/add.png" alt="items" />
        <h3 class="d-block d-md-none ml-2">Add Item</h3>
      </div>
      <div>
        <button
          class="btn d-flex justify-content-center ml-0 ml-md-3"
          id="signout"
          @click="onLogout()"
        >
          <i class="fas fa-sign-out-alt" style="font-size: 50px"></i>
          <h3 class="d-block d-md-none ml-2">Logout</h3>
        </button>
      </div>
    </div>
    <b-modal
      ref="add-modal"
      hide-footer
      centered
      id="modal-center"
      title="Add Item"
    >
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
                :value="category.category_id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-100 mt-5 d-flex justify-content-end">
          <button @click="cancelModal" class="btn px-4 cancelBtn">
            Cancel
          </button>
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
      getData: {
        params: '',
        sort:'',
        search:'',
        page: 1
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
          this.swalPop('Insert Product Failed', response.err.message, 'error')
        } else {
          this.actionGetProduct(this.getData).then(()=>{
            this.swalPop('Insert Product Success', '', 'success')
            this.form = {
                name: '',
                price: '',
                image: '',
                category: '',
              }
            this.$refs['add-modal'].hide()
          })
        }
      })
    },
    modal() {
      this.$refs['add-modal'].show()
    },
    cancelModal() {
      this.form = {
        name: '',
        price: '',
        image: '',
        category: '',
      }
      this.$refs['add-modal'].hide()
    },
    onLogout() {
      this.actionLogout().then(() => {
        // console.log(response);
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
