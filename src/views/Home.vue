<template>
  <div>
    <div>
      <Navbar title="Food Items" />
    </div>
    <div class="row zindex">
      <div class="col-1">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';


export default {
  name: 'Home',
  components: {
    Sidebar,
    Navbar,
  },
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