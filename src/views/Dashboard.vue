<template>
  <div class="dashboard">
    <div class="container mx-auto">
      <div class="row">
        <h1>Dashboard</h1>
        <PollsDisplay />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PollsDisplay from "@/components/PollsDisplay.vue";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../main';
import router from '@/router';

export default {
  name: "dashboard",
  components: {
    PollsDisplay,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  created(){

  },
  methods: {
    checkAuth(){
      onAuthStateChanged(auth, (user)=>{
              if (user) {
                // If user is signed in
              } else {
                // If user is not signed in
                router.push({ name: "Home" });
              }
            });

    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  min-width: 540px;
  height: 100vh;
  // background-color: blue;
}
h1 {
  text-align: left;
}
</style>