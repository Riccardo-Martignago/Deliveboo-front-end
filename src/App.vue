<script>
import { RouterLink, RouterView } from 'vue-router'
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  export default{
      components:{
        AppHeader,
        AppFooter,
      },
    }
</script>

<template>
  <AppHeader/>
  <RouterView/>
  <AppFooter/>
</template>

<style scoped>

</style>
