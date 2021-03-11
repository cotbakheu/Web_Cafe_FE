import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// import Store from '../store/index'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { auth: false },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { auth: true },
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { auth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      alert('anda belum login');
      next({
        path: '/login',
      });
    }
  } else if (to.matched[0].meta.auth === false) {
    if (localStorage.getItem('token')){
      alert ('anda sudah login')
      next({
        path:'/'
      })
    }
    next();
  }else {
    next();
  }
});

export default router
