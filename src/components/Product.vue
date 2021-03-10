<template>
  <div class="row row-cols-md-4 row-cols-lg-3 row-cols-2">
    <div v-for="(product, index) in getProduct" :key="index">
      <div class="card mt-2" style="width: 14rem">
        <img
          @click="toCart(product)"
          :src="`${WebURL}/image/${product.image}`"
          class="card-img-top"
          alt="product"
        />
        <div class="card-body d-flex">
          <div class="text-left">
            <h5 class="card-title">{{ product.name }}</h5>
            <span class="card-text mb-2">{{ curency(product.price) }} </span>
          </div>
          <div @click="toDetail(product)" class="text-center ml-5">
            <h4 class="text-primary">
              <i class="fas fa-info-circle"></i>
            </h4>
            <p>Detail</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {cafeMixins} from '../helpers/mixins'

export default {
    mixins:[cafeMixins],
    data() {
        return {
            WebURL: process.env.VUE_APP_SERVER,
            getData: {
              params: '',
              sort:'',
              search:'',
              page: 1
            }
        }
    },
computed: {
    ...mapGetters({
      getProduct:'product/getProduct'
    })
  },
  methods: {
    ...mapActions({
      actionGetProduct: 'product/actionsGetProduct'
    }),
    toCart(el) {
        this.$emit('addCart', el)
    },
    toDetail(val) {
      console.log(val)
    }
  },
  mounted() {
    this.actionGetProduct(this.getData)
  }
}
</script>

<style>
</style>