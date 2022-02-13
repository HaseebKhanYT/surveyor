<template>
  <div id="app">
    <div class="navigation" id="nav">
      <Navbar /> <!-- add v-if="!navigation" to remove navgation bar while login --> 
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: { Navbar },
  data() {
    return {
      navigation : false,
    };
  },
  created(){
    document.title = 'Surveyor | Create Polls';
  },
  methods: {
    /**
     * checkRoute checks if the user is on Login or Register page
     */
    // checkRoute() {
    //   if(this.$route.name === 'Login' || this.$route.name === 'Register' ){
    //     this.navigation = true;
    //     return;
    //   };
    //   this.navigation = false;
    // }
  },
  watch:{
    // $route(){
    //   this.checkRoute();
    // }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  text-align: left;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
