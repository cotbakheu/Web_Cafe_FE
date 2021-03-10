<template>
  <div>
    <div>
      <Navbar />
    </div>
    <div class="row">
      <div
        class="col-md-2 col-lg-1 d-none d-md-block shadow-lg"
        style="height: 100vh"
      >
        <Sidebar />
      </div>
      <div class="col-7 bg-secondary">
        <div>
          {{ getDetail }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Detail',
    components: {
        Sidebar,
        Navbar
    },
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        ...mapGetters({
            getDetail: 'product/detailProduct'
        })
    },
    methods: {
        ...mapActions({
            actionGetDetail: 'product/actionsGetDetail'
        })

    },
    mounted() {
        this.actionGetDetail(this.id)
    }
}
</script>

<style>
</style>