<template>
  <div>
    <div>
      <Navbar title="History" :configNav="configNav" />
    </div>
    <div class="row">
      <div
        class="col-md-2 col-lg-1 d-none d-md-block shadow-lg"
        style="height: 100vh"
      >
        <Sidebar />
      </div>
      <div class="col-10">
        <div class="row">
          <div id="history-box" class="col text-justify first-box">
            <div class="first-history-text">Today's Income</div>
            <div class="history-number">Rp. 10.000</div>
            <div class="history-text">+2% Yesterday</div>
            <div id="dot">
              <span class="bottom-dot"></span>
              <span class="middle-dot"></span>
              <span class="top-dot"></span>
            </div>
          </div>
          <div id="history-box" class="col text-justify second-box">
            <div class="first-history-text">Orders</div>
            <div class="history-number">3.270</div>
            <div class="history-text">+5% Last Week</div>
            <div id="dot">
              <span class="bottom-dot"></span>
              <span class="middle-dot"></span>
              <span class="top-dot"></span>
            </div>
          </div>
          <div id="history-box" class="col text-justify third-box">
            <div class="first-history-text">This Year's Income</div>
            <div class="history-number">Rp. 100.000.000.000</div>
            <div class="history-text">+10% Last Year</div>
            <div id="dot">
              <span class="bottom-dot"></span>
              <span class="middle-dot"></span>
              <span class="top-dot"></span>
            </div>
          </div>
        </div>
        <div class="shadow-lg mt-5 rounded p-3">
          <div class="d-flex justify-content-end align-items-center mb-3">
            <form action="" @submit.prevent="search">
              <div class="input-group">
                <input
                  v-model="getData.search"
                  @keyup="search"
                  type="text"
                  class="form-control"
                  placeholder="Invoice or Cashier"
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
            <div class="ml-3">
              <b-dropdown
                id="dropdown-left"
                text="Order By"
                variant="outline-dark"
                class="m-2"
              >
                <b-dropdown-item
                  @click="sort('date', 'asc')"
                  style="font-size: 20px"
                  >Latest Date</b-dropdown-item
                >
                <b-dropdown-item
                  @click="sort('date', 'desc')"
                  style="font-size: 20px"
                  >Newest Date</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">INVOICE</th>
                  <th scope="col">CASHIER</th>
                  <th scope="col">DATE</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col">DETAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="history in getHistory" :key="history.id">
                  <td>{{ history.invoice }}</td>
                  <td>{{ history.cashier }}</td>
                  <td>{{ history.date }}</td>
                  <td>{{ history.quantity }}</td>
                  <td>{{ curency(Number(history.amount)) }}</td>
                  <td @click="toDetail(history.invoice)" class="text-primary">
                    Detail <i class="fas fa-info-circle"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      </div>
      <b-modal
        hide-footer
        ref="detailHistory"
        id="modal-lg"
        size="lg"
        title="Detail History"
        ><div>
          <div class="d-flex justify-content-between border-bottom">
            <h4>Product</h4>
            <h4>Quantity</h4>
            <h4>Amount</h4>
          </div>
          <div
            v-for="detHistory in detail"
            :key="detHistory.id"
            class="d-flex justify-content-between mt-3"
          >
            <h4>{{ detHistory.name }}</h4>
            <h4>{{ detHistory.total_product }}</h4>
            <h4>{{ detHistory.price }}</h4>
          </div>
        </div></b-modal
      >
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import {cafeMixins} from '../helpers/mixins'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'History',
    mixins: [cafeMixins],
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            configNav: false,
            getData: {
              params: '',
              sort:'',
              search:'',
              page: 1
            },
            detail: []
        }
    },

    computed: {
        ...mapGetters({
          getHistory: 'history/getHistory',
          detailHistory: 'history/detailHistory',
          getPagination: 'history/getPagination'
        })
    },
    methods: {
        ...mapActions({
            actionGetHistory: 'history/actionGetHistory',
            actionDetailHistory: 'history/actionDetailHistory'
        }),
        search() {
        this.actionGetHistory(this.getData).then(()=>{
          
        }).catch((err)=>{
          console.log(err)
        })
      },
      sort(params, sort) {
        this.getData.sort = sort
        this.getData.params = params
        this.actionGetHistory(this.getData)
      },
      toDetail (val) {
        this.actionDetailHistory(val).then((response)=>{
          this.detail = response
          // console.log(this.detail)
          // this.swalLoadingClose()
          this.$refs['detailHistory'].show()
        }).catch((err)=>{
          console.log(err)
        })
      },
      nextPage() {
        this.actionGetProduct(this.getData)
      }
    },
    mounted() {
        this.actionGetHistory(this.getData)
    }

}
</script>

<style>
#history-box {
  width: auto;
  height: 170px;
  margin: 20px 40px 0px 10px;
  padding: 25px;
}
#history-box.first-box {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.35));
  border-radius: 10px;
}
#history-box.second-box {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.35));
  border-radius: 10px;
}
#history-box.third-box {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.5));
  border-radius: 10px;
}
/* .bottom-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 25px;
  top: 10px;
  position: absolute;
}
.top-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 50px;
  top: 30px;
  position: absolute;
}
.middle-dot {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  right: 75px;
  top: 50px;
  position: absolute;
} */
</style>