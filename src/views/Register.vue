<template>
  <div class="register">
    <div class="container">
      <div class="mb-3 row">
        <label for="userName" class="col-sm-2 col-form-label">Username</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="userName"
            placeholder="username"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
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
            class="form-control"
            id="inputPassword"
            v-model="password"
            placeholder="password"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label"
          >Confirm Password</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="cPassword"
            placeholder="confirm password"
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
            @click="signUp"
            type="button"
            class="btn btn-success"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <p class="account-exist-message">
            Already have an account?
            <strong><router-link to="/login"> Login here </router-link></strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseApp, db, auth } from "../main";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import router from "@/router";

export default {
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
      error: false,
      errorMessage: "",
      userId: "",
      loggedIn: false,
    };
  },
  methods: {
    // If userName already Exists
    // If email already Exists
    signUp(): void {
      if (
        this.email === "" ||
        this.password === "" ||
        this.userName === "" ||
        this.cPassword === ""
      ) {
        this.error = true;
        this.errorMessage = "Please enter all the details to sign up.";
      } else if (this.userName.length < 6) {
        this.error = true;
        this.errorMessage = "Username should have atleast 6 characters.";
      } else if (!this.validEmail(this.email)) {
        this.error = true;
        this.errorMessage = "Please enter a valid e-mail.";
      } else if (this.password !== this.cPassword) {
        this.error = true;
        this.errorMessage = "Passwords don't match.";
      } else if (this.password.length < 6) {
        this.error = true;
        this.errorMessage = "Password should have atleast 6 characters.";
      } else {
        this.error = false;
        this.errorMessage = "";
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const userIdentification = userCredential.user?.uid;
            this.userId = userIdentification;

            setDoc(doc(db, "users", this.userId), {
              userName: this.userName,
              email: this.email,
              userId: this.userId,
            });
            sessionStorage.setItem("userId", this.userId);

            onAuthStateChanged(auth, function (user): void {
              if (user) {
                // If user is signed in
                router.push({ name: "Dashboard" });
              } else {
                // If user is not signed in
                router.push({ name: "Login" });
              }
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            this.errorMessage = error.message;
          });
      }
    },

    checkAuth() {
      onAuthStateChanged(auth, (user): void => {
        if (user) {
          // If user is signed in
          this.loggedIn = true;
          router.push({ name: "Dashboard" });
        } else {
          // If user is not signed in
          this.loggedIn = false;
        }
      });
    },

    validEmail(email: string): boolean {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style lang="scss">
.register {
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

.error-message {
  color: red;
}

#loginButton {
  width: 100%;
}
</style>
