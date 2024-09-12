import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/AppHome.vue'
import restaurantsView from '../views/AppRestaurants.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: restaurantsView
    }
  ]
})

export default router
