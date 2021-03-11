<template>
  <div>
    <div class="d-flex justify-content-center border-bottom py-3">
      <div class="ml-md-5 ml-lg-4" style="cursor: pointer">
        <i
          class="fa fa-bars d-none d-md-block"
          @click="toggle"
          style="font-size: 40px"
        ></i>
        <div @click="onDrop()">
          <i class="fa fa-bars d-sm-none d-block" style="font-size: 20px"></i>
          <i
            class="fa fa-bars d-sm-block d-md-none d-none"
            style="font-size: 30px"
          ></i>
        </div>
        <div v-if="dropSmall" class="bg-light d-flex flex-column drop">
          <div class="bg-light mt-2 w-50 ml-2">
            <div class="d-block d-md-none">
              <form action="">
                <div class="input-group">
                  <div @click.prevent="search" class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2"
                      ><i class="fa fa-search"></i
                    ></span>
                  </div>
                  <input
                    v-model="searchValue"
                    @keyup="search"
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="bg-light ml-3">
            <Sidebar />
          </div>
        </div>
      </div>
      <div v-if="configNav === false" class="col-11">
        <h3 class="d-none d-md-block">{{ title }}</h3>
        <h5 class="d-block d-md-none">{{ title }}</h5>
      </div>
      <div v-else class="col-5">
        <h3 class="d-none d-md-block">{{ title }}</h3>
        <h5 class="d-block d-md-none">{{ title }}</h5>
      </div>
      <div v-if="configNav === true" class="d-none d-md-block col-2">
        <form action="">
          <div class="input-group">
            <input
              v-model="getData.search"
              @keyup="search"
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div @click.prevent="search" class="input-group-append">
              <span class="input-group-text" id="basic-addon2"
                ><i class="fa fa-search"></i
              ></span>
            </div>
          </div>
        </form>
      </div>
      <div
        v-if="configNav === true"
        class="col-4 ml-4 border-left d-flex justify-content-center align-items-center"
      >
        <h5>Cart</h5>
        <div class="cartLength badge rounded-pill ml-2">
          <h5>{{ cartLength }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {cafeMixins} from '../helpers/mixins'
import Sidebar from '../components/Sidebar'

export default {
  name: 'Navbar',
  mixins:[cafeMixins],
  props: ['title', 'configNav', 'cartLength'],
  components: {
    Sidebar
  },
  data() {
    return {
      status: true,
      dropSmall: false,
      getData: {
        params: '',
        sort:'',
        search:'',
        page: 1
      }
    };
  },
  methods: {
    ...mapActions({
      searchProduct: 'product/actionsGetProduct',
    }),
    toggle () {
      this.onToggle()
      // console.log(this.toggleSidebar)
    },
    onDrop() {
      this.dropSmall = !this.dropSmall
    },
    search() {
      this.$emit('searching', this.getData.search)
      this.searchProduct(this.getData).then(()=>{
        
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
};
</script>

<style scoped>
.drop {
  position: absolute;
  display: block;
  left: 0;
  margin-top: 29px;
  width: 100%;
  height: 100%;
  transition: 1s ease-out;
  height: auto;
  z-index: 5;
}
.cartLength {
  background-color: #23b6e2;
}
</style>
