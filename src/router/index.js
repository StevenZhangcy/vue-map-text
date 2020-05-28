import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main/Main.vue'

Vue.use(VueRouter)

const routes = [{
  path: '*',
  redirect: '/map'
}, {
  path: '/main',
  name: 'Main',
  component: Main,
  // component: () => import('../components/map.vue')
  children: [{
    name: 'map',
    path: '/map',
    component: () => import('../components/map/map.vue')
  }, {
    name: 'pie',
    path: '/pie',
    component: () => import('../components/chart/pie.vue')
  }, {
    name: 'line',
    path: '/line',
    component: () => import('../components/chart/line.vue')
  }, {
    path: '/weather',
    name: 'weather',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/weather/index.vue')
  }, {
    path: '/joke',
    name: 'joke',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/joke/index.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router