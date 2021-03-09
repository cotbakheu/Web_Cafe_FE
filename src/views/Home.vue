<template>
  <div>
    <div>
      <Navbar title="Food Items" />
    </div>
    <div class="row zindex">
      <div class="col-1">
        <Sidebar />
      </div>
      <div class="col-7 mt-4 row row-cols-3" id="menu-list">
        <div v-for="product in getProduct" :key="product.id">
          <div class="col ml-2 mt-3">
            <div class="card">
              <img
                :src="`${WebURL}/image/${product.image}`"
                class="card-img-top"
                alt="image"
                id="img-cursor"
              />
              <div class="card-body d-flex flex-column justify-content-center">
                <h5 class="card-title" id="card-title">{{ product.name }}</h5>
                <span class="mb-2">{{ curency(product.price) }}</span>
                <button @click="gotoDetail(item.id)" class="btn btn-primary">
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cartList.length <= 0" class="shadow col-4">
        <div>
          <aside class="right" id="side-right">
            <div class="w-100">
              <img
                class="image"
                src="../assets/images/food-and-restaurant.png"
                alt="image-empty"
              />
              <h3 class="menu-cart" id="menu_cart">Your cart is empty</h3>
              <p class="menu-add">
                <i>Please add some items from the menu!</i>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import {mapActions, mapGetters} from 'vuex'
import {cafeMixins} from '../helpers/mixins'


export default {
  name: 'Home',
  mixins: [cafeMixins],
  data () {
    return {
      WebURL: process.env.VUE_APP_SERVER,
      cartList: []
    }
  }, 
  components: {
    Sidebar,
    Navbar,
  },
  computed: {
    ...mapGetters({
      getProduct:'product/getProduct'
    })
  },
  methods: {
    ...mapActions({
      actionGetProduct: 'product/actionsGetProduct'
    })
  },
  mounted() {
    this.actionGetProduct()
  }
};
</script>

<style scoped>
/* .zindex {
  position: absolute;
  z-index: 10;
} */
#nav {
  position: relative;
  z-index: 0;
}
</style>