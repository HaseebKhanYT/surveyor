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
import {doc, collection, where, getDocs, query, getDoc } from 'firebase/firestore';
import {auth, db} from '../main';
import router from '@/router';

export default {
  name: "dashboard",
  components: {
    PollsDisplay,
  },
  data() {
    return {
      loggedIn: false,
      userId : '',
      userName: '',
    };
  },
  created(){
    this.checkAuth();
  },
  methods: {
    checkAuth(){
      onAuthStateChanged(auth, async (user)=>{
              if (user) {
                // If user is signed in
                this.loggedIn = true;
                this.userId = user.uid;
                
                const docRef = doc(db, 'users', this.userId);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){
                  this.userName = docSnap.data().userName;
                }
                else{
                  console.log('error in firestore');
                  
                }
                
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
}
h1 {
  text-align: left;
}
</style>