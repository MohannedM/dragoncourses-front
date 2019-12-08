<template>
  <v-app>
    <home></home>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';
export default {
  components:{
    Home
  },
  beforeCreate(){
    this.$store.dispatch('setAuth');
  },
  mounted(){
    this.$store.dispatch('logoutTimer');
  }
}
</script>
