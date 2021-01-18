import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeContainer from '../presentations/views/Home/container.vue'
import InstanceModalContainer from '@/presentations/views/Home/localComponents/InstanceModal/container.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeContainer,
    children: [
      {
        path: ':location',
        name: 'Instance',
        component: InstanceModalContainer,
        props: true,
      },
    ],
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router
