<template>
  <div>
    <div>
      <Navbar
        title="Food Items"
        @searching="valueSearch"
        :configNav="configNav"
        :cartLength="cartLength"
      />
    </div>
    <div class="row">
      <div
        class="col-md-2 col-lg-1 d-none d-md-block shadow-lg"
        style="height: 100vh"
      >
        <Sidebar />
      </div>
      <div class="col-6 mt-4 ml-4 mr-lg-4">
        <div class="d-flex justify-content-end align-items-center">
          <b-dropdown
            id="dropdown-left"
            text="Order By"
            variant="outline-dark"
            class="m-2"
          >
            <b-dropdown-item
              @click="sort('name', 'asc')"
              style="font-size: 20px"
              >Name <i class="fas fa-sort-alpha-down"></i
            ></b-dropdown-item>
            <b-dropdown-item
              @click="sort('name', 'desc')"
              style="font-size: 20px"
              >Name <i class="fas fa-sort-alpha-down-alt"></i
            ></b-dropdown-item>
            <b-dropdown-item
              @click="sort('price', 'asc')"
              style="font-size: 20px"
              >Price <i class="fas fa-sort-numeric-down"></i
            ></b-dropdown-item>
            <b-dropdown-item
              @click="sort('price', 'desc')"
              style="font-size: 20px"
              >Price <i class="fas fa-sort-numeric-down-alt"></i
            ></b-dropdown-item>
          </b-dropdown>
        </div>
        <Product @addCart="toCart" />
        <div class="d-flex justify-content-center align-items-center">
          <b-pagination
            @input="nextPage"
            v-model="getData.page"
            :total-rows="getPagination.totalData"
            :per-page="getPagination.limit"
            size="sm"
            align="center"
            class="mt-2 mr-4"
          ></b-pagination>
        </div>
      </div>
      <div
        v-if="cartList.length <= 0"
        class="shadow d-none d-lg-block col-4 ml-5"
      >
        <div>
          <aside class="right" id="side-right">
            <div class="">
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
      <div v-else class="shadow d-none d-lg-flex flex-column col-4 ml-5">
        <div class="h-100">
          <div
            v-for="(item, index) in cartList"
            :key="index"
            class="pt-3 px-5 d-flex justify-content-between border-bottom pb-2"
          >
            <div class="mr-1">
              <img
                :src="`${WebURL}/image/${item.image}`"
                width="100px"
                height="80px"
                alt="image"
                id="img-cursor"
              />
            </div>
            <div>
              <h4>{{ item.name }}</h4>
              <div class="d-flex">
                <div @click="addQty(item)" class="py-1 px-2 qtyBtn">
                  <h5>+</h5>
                </div>
                <div class="py-1 px-2 qty">{{ item.total_product }}</div>
                <div @click="minQty(item)" class="py-1 px-2 qtyBtn">
                  <h5>-</h5>
                </div>
              </div>
            </div>
            <div class="mx-1 text-right">
              <div @click="delCart(item)">
                <h5 class="text-danger text-right">
                  <i class="far text-danger fa-times-circle mb-4"></i>
                </h5>
              </div>
              <h5 class="mt-2">{{ curency(item.totalPrice) }}</h5>
            </div>
          </div>
        </div>
        <div class="px-3">
          <button @click="checkout" class="btn w-100 cancelBtn">
            <h3>Checkout</h3>
          </button>
          <button @click="cancelCart" class="btn w-100 mt-3 confirmBtn">
            <h3>Cancel</h3>
          </button>
          <div>
            <b-modal
              ref="checkout"
              hide-footer
              hide-header
              id="modal-center"
              centered
            >
              <div class="d-flex justify-content-between mb-5">
                <div>
                  <h3 class="text-bold">Checkout</h3>
                  <h5>Cashier: {{ cashier }}</h5>
                </div>
                <div class="text-right">
                  <h5>Receipt no. : {{ useInvoice }}</h5>
                </div>
              </div>
              <div>
                <div
                  class="d-flex justify-content-between"
                  v-for="item in cartList"
                  :key="item.id"
                >
                  <div>
                    <h5>{{ item.name }} {{ item.total_product }}x</h5>
                  </div>
                  <div>
                    <h5>{{ curency(item.totalPrice) }}</h5>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>
                    <h5>Ppn 10%:</h5>
                  </div>
                  <div>
                    <h5>{{ curency(ppn) }}</h5>
                  </div>
                </div>
                <div class="text-right mt-3">
                  <h5>Total: {{ curency(total) }}</h5>
                </div>
                <div class="mt-3">
                  <h5>Payment: Cash</h5>
                </div>
              </div>
              <div class="text-center">
                <button @click="sendData" class="btn confirmBtn w-100">
                  <h4>Print</h4>
                </button>
                <h3>or</h3>
                <button @click="sendData" class="btn cancelBtn w-100">
                  <h4>Send Email</h4>
                </button>
              </div>
            </b-modal>
          </div>
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
import Product from '../components/Product'


export default {
  name: 'Home',
  mixins: [cafeMixins],
  data () {
    return {
      WebURL: process.env.VUE_APP_SERVER,
      cartList: [],
      history: [],
      useInvoice: '',
      cashier: localStorage.getItem('username'),
      total: 0,
      ppn:0,
      getData: {
        params: '',
        sort:'',
        search:'',
        page: 1
      },
      configNav: true,
      cartLength: 0,
    }
  }, 
  components: {
    Sidebar,
    Navbar,
    Product
  },
  computed: {
    ...mapGetters({
      getProduct:'product/getProduct',
      getPagination: 'product/getPagination'
    })
  },
  methods: {
    ...mapActions({
      actionGetProduct: 'product/actionsGetProduct',
      actionInsertHistory: 'history/insertHistory',
      actionGetDetail: 'product/actionsGetDetail',
    }),
    toCart (value) {
      const checkProduct = this.cartList.filter(item => {
        return item.id === value.id
      })
      if (checkProduct.length >= 1) {
        this.cartList.forEach(el => {
          if (el.id === value.id) {
            el.total_product += 1
            el.totalPrice += value.price 
          }
        })
      } else {
        const newData = { 
          ...value, 
          total_product: 1, 
          totalPrice: value.price 
        }
        this.cartList = [...this.cartList, newData]
        this.cartLength = this.cartList.length
      }
    },
    addQty (value) {
      this.cartList.forEach(el => {
        if (el.id === value.id) {
          el.total_product +=1
          el.totalPrice += value.price
        }
      })
    },
    minQty (value) {
      this.cartList.forEach(el => {
        if (el.id === value.id) {
          el.total_product -=1
          el.totalPrice -= value.price
          if (el.total_product <= 0){
            const newData =this.cartList.filter(el=>{
              return value.id != el.id
            })
            this.cartList = newData
          }
        }
      })
    },
    delCart(value) {
      this.swalConfirm('Do you want to remove this items?', '', 'question').then((response)=>{
        if (response) {
          const newData =this.cartList.filter(el=>{
              return value.id != el.id
            })
          this.cartList = newData
        }
      })
    },
    cancelCart() {
      this.swalConfirm('Do you want to empty cart?', '', 'question').then((response)=>{
        if(response) {
          this.cartList = []
        }
      })
    },
    checkout () {
      const d = new Date()
      const invoice = `${d.getYear()}${d.getMonth()+1}${d.getDate()}${d.getHours()+d.getMinutes()+d.getSeconds()}${localStorage.getItem('id')}`
      this.useInvoice = invoice
      const data = this.cartList.map(el => {
        const rawData = {
          invoice: invoice,
          cashier: this.cashier,
          id_product: el.id,
          total_product: el.total_product,
          price: el.totalPrice
        }
        return rawData
      })
      const num = this.cartList.map(el=>{
        return el.totalPrice
      })
      const dataTotal = num.reduce((acc,cur)=>{
          return acc + cur
      },0)
      this.ppn = dataTotal * 0.1
      this.total = dataTotal + this.ppn
      this.history = data
      this.$refs['checkout'].show()
    },
    sendData () {
      this.swalLoading('Sending data')
      this.actionInsertHistory(this.history).then((response)=> {
        if (response.data.code === 200) {
          this.$refs['checkout'].hide()
          this.cartList=[]
          this.swalLoadingClose()
          this.swalPop('Order Recieve!', 'Please wait in your table', 'info')
        } else {
          this.$refs['checkout'].hide()
          this.swalLoadingClose()
          this.swalPop('Something wrong with server', '', 'error')
        }
      }).catch((err)=> {
        console.log(err)
      })
    },
    sort(params, sort) {
      this.getData.params = params
      this.getData.sort = sort
      this.actionGetProduct(this.getData)
    },
    valueSearch(val) {
      this.getData.search = val
    },
    nextPage() {
      this.actionGetProduct(this.getData)
    }
  },
  mounted() {
    this.actionGetProduct(this.getData)
    this.actionGetDetail()
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
.product {
  margin-left: 100px;
}
.qtyBtn {
  background-color: #e6fae3;
  border: solid 1px #97f589;
}
.qty {
  border: solid 1px #97f589;
}
</style>