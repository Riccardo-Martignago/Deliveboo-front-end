import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/AppHome.vue'
import RestaurantsView from '../views/AppRestaurants.vue'
import SearchView from '../views/AppSearch.vue'
import AboutView from '../views/AppAbout.vue'
import DishView from '../views/AppDish.vue'
import shopView from '../views/AppShop.vue'

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
      component: RestaurantsView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/dish',
      name: 'dish',
      component: DishView,
    },,
    {
      path: '/shop',
      name: 'shop',
      component: shopView,
    },
  ]
});

export default router
