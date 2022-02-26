<template>
  <div class="login">
    <div class="container">
      <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="name@doglapan.com"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="inputPassword"
            placeholder="password"
          />
        </div>
      </div>
      <div class="row" v-show="error">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <p class="error-message">
            {{ this.errorMessage }}
          </p>
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <button
            id="loginButton"
            @click="logIn"
            type="button"
            class="btn btn-success"
          >
            Log In
          </button>
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <p class="account-exist-message">
            Don't have an account yet?
            <strong
              ><router-link to="/register"> Register here </router-link></strong
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseApp, db, auth } from "../main";
import { signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
import router from '@/router';

export default Vue.extend( {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loggedIn: false,
    };
  },
  created(){
    this.checkAuth();
  },
  methods: {
    logIn() {
      // if(!userNameExist){
      //   this.error = true;
      //   this.errorMessage = 'User does not exist, please register';
      // }
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          // const errorCode = error.code;
          this.error = true;
          this.errorMessage = error.message;
          // console.log(errorMessage);
        });
    },
    checkAuth() {
      onAuthStateChanged(auth, (user): void => {
        if (user) {
          // If user is signed in
          this.loggedIn = true;
          router.push({name: 'Dashboard'});
        } else {
          // If user is not signed in
          this.loggedIn = false;
        }
      });
    },
  },
});
</script>

<style lang="scss">
.login {
  position: relative;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
.verticle-align {
  // width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#loginButton {
  width: 100%;
}
</style>