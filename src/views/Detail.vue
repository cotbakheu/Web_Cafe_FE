<template>
  <div>
    <div>
      <Navbar title="Detail" :configNav="configNav" />
    </div>
    <div class="row">
      <div
        class="col-md-2 col-lg-1 d-none d-md-block shadow-lg"
        style="height: 100vh"
      >
        <Sidebar />
      </div>
      <div class="col-9 d-flex justify-content-center">
        <div class="">
          <div class="card mt-2" style="width: 14rem">
            <img
              :src="`${WebURL}/image/${getDetail.image}`"
              class="card-img-top"
              alt="product"
            />
            <div class="card-body">
              <div class="text-left">
                <div class="d-flex border-bottom mt-2 justify-content-between">
                  <h5>Name:</h5>
                  <h5 class="text-right">{{ getDetail.name }}</h5>
                </div>
                <div class="d-flex border-bottom mt-2 justify-content-between">
                  <h5>Price:</h5>
                  <h5 class="text-right">{{ curency(getDetail.price) }}</h5>
                </div>
                <div class="d-flex border-bottom mt-2 justify-content-between">
                  <h5>Category:</h5>
                  <h5 class="text-right">{{ getDetail.category_name }}</h5>
                </div>
                <div class="mt-4">
                  <button @click="delProduct" class="btn w-100 btn-danger p-2">
                    Delete
                  </button>
                  <button @click="upProduct" class="btn w-100 mt-2 confirmBtn">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal
        ref="update-modal"
        hide-footer
        centered
        id="modal-center"
        title="Update Item"
      >
        <form @submit.prevent="upSubmit(id)" action="">
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
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import {mapActions, mapGetters} from 'vuex'
import {cafeMixins} from '../helpers/mixins'

export default {
    name: 'Detail',
    mixins: [cafeMixins],
    components: {
        Sidebar,
        Navbar
    },
    data() {
        return {
            WebURL: process.env.VUE_APP_SERVER,
            id: this.$route.params.id,
            form : {
              name: '',
              price: '',
              image: '',
              category: ''
            },
            configNav: false
        }
    },
    computed: {
        ...mapGetters({
            getDetail: 'product/detailProduct',
            listCategory: 'category/getCategory',
        })
    },
    methods: {
        ...mapActions({
            actionGetDetail: 'product/actionsGetDetail',
            deleteProduct: 'product/actionsDeleteProduct',
            actionGetCategory: 'category/actionGetCategory',
            actionUpdateData: 'product/actionsUpdateProduct',
            actionGetProduct: 'product/actionsGetProduct',
        }),
      delProduct() {
        this.deleteProduct(this.id).then((response)=>{
          this.swalPop(response.message, '', 'success')
          this.actionGetProduct()
          this.linkTo('')
        }).catch((err)=>{
          console.log(err)
        })  
      },
      uploadFile(e) {
        this.form.image = e.target.files[0];
        // console.log(this.form.image)
      },
      upProduct() {
        this.form = {
          name: this.getDetail.name,
          price: this.getDetail.price,
          image: '',
          category: ''
        }
        this.$refs['update-modal'].show()
      },
      upSubmit(val) {
        const newPrice = Number(this.form.price)
        const fd = new FormData();
        fd.append('name', this.form.name);
        fd.append('price', newPrice);
        fd.append('image', this.form.image);
        fd.append('category', this.form.category);
        const data = {fd, id: val}
        this.actionUpdateData(data).then((response)=>{
          if (response.code === 500) {
            this.swalPop('Insert Product Failed', response.err.message, 'error')
          } else {
            this.swalPop('Update Product Success', '', 'success')
            this.actionGetDetail(this.id)
            this.actionGetProduct()
            this.$refs['update-modal'].hide()
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
    cancelModal() {
        this.$refs['update-modal'].hide()
      },
    },
    mounted() {
      this.$route.params.id
      this.actionGetDetail(this.id)
      this.actionGetCategory()

    }
}
</script>

<style>
</style>