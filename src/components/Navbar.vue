<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Surveyor</router-link
      >
      <ul class="navbar-nav">
        <li v-show="!loggedIn" class="nav-item">
          <router-link class="navbar-link" to="/login">LogIn</router-link>
        </li>
        <li v-show="loggedIn" class="nav-item">
          <div class="navbar-link" @click="logOut">Logout</div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { firebaseApp, auth } from "../main";
import router from "@/router";

export default {
  data() {
    return {
      loggedIn: false,
      error: false,
      errorMessage: "",
    };
  },
  created() {
    this.authCheck();
  },
  methods: {
    authCheck() {
      onAuthStateChanged(auth, (user): void => {
        if (user) {
          // If user is signed in
          this.loggedIn = true;
          user.uid
          sessionStorage.setItem("userId", user.uid);
        } else {
          // If user is not signed in
          this.loggedIn = false;
        }
      });
    },
    logOut() {
      signOut(auth)
        .then(() => {
          console.log("Signed Out Successfully!");
          router.push({ name: "Home" });
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

.navbar-link {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}
</style>
