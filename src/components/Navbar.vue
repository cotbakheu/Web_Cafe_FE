<template>
  <div>
    <div class="d-flex justify-content-center border-bottom py-3">
      <div style="cursor: pointer" @click="toggle">
        <i class="fa fa-bars" style="font-size: 40px"></i>
      </div>
      <div class="col-5">
        <h3>{{ title }}</h3>
      </div>
      <div class="col-2">
        <form action="">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2"
                ><i class="fa fa-search"></i
              ></span>
            </div>
          </div>
        </form>
      </div>
      <div
        class="col-4 border-left d-flex justify-content-center align-items-center"
      >
        <h5>Cart</h5>
        <div class="rounded-pill ml-2"><h5>0</h5></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {cafeMixins} from '../helpers/mixins'

export default {
  name: 'Navbar',
  mixins:[cafeMixins],
  props: ['title'],
  components: {
  },
  data() {
    return {
      status: true,
    };
  },
  methods: {
    ...mapActions({
      searchProduct: 'product/getItems',
    }),
    toggle () {
      this.onToggle()
      console.log(this.toggleSidebar)
    },
    onSearch() {

    },
  },
};
</script>

<style scoped>
</style>
