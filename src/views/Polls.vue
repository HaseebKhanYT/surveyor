<template>
  <div class="dashboard">
    <div class="container mx-auto">
      <div class="row justify-content-center align-center">
        <div class="col-12 py-4 mb-4">
          <h1>{{ this.questionName }}</h1>
        </div>
      </div>
      <div class="row justify-content-around">
        <div @click="selectOp1" class="col-4 option1">
          <h3 class="center-me">{{ this.options.option1.name }}</h3>
        </div>
        <div @click="selectOp2" class="col-4 option2">
          <h3 class="center-me">{{ this.options.option2.name }}</h3>
        </div>
      </div>
      <div v-show="error" class="row justify-content-center mt-4">
        <div class="col-12 errorMessage">
          <h3 >{{ this.errorMessage }}</h3>
        </div>
      </div>
      <div v-show="success" class="row justify-content-center mt-4">
        <div class="col-12 successMessage">
          <h3>{{ this.successMessage }}</h3>
          <router-link :to="{name:'Dashboard'}">
          <button
            type="button"
            class="btn mx-3 btn-success"
          >
            Create your own poll
          </button>
          </router-link>
          <button
            type="button"
            class="btn mx-3 btn-info"
            @click="copyUrl"
          >
            Share this poll
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Analyze from "@/components/Analyze.vue";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
  increment,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../main";
import router from "@/router";

export default Vue.extend({
  name: "dashboard",
  components: {},
  data() {
    return {
        success: false,
        successMessage: 'Your vote was a success',
      error: false,
      errorMessage: "",
      userResponse: false,
      userName: "",
      userId: "",
      loggedIn: false,
      pollId: this.$route.params.id,
      responses: 0,
      questionName: "",
      options: {
        option1: {
          name: "",
          value: 0,
        },
        option2: {
          name: "",
          value: 0,
        },
      },
    };
  },
  created() {
    this.checkAuth();
    this.updatePollData();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // If user is signed in
          this.loggedIn = true;
          this.userId = user.uid;

          const docRef = doc(db, "users", this.userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.userName = docSnap.data().userName;
          } else {
            console.log("error in firestore");
          }
        } else {
          // If user is not signed in
          router.push({ name: "Home" });
        }
      });
    },
    updatePollData() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const pollsRef = doc(userRef, "polls", this.$route.params.id);
          const cPollsRef = collection(userRef, "polls");

          const q = query(cPollsRef);
          const querySnapshot = await getDocs(q);
          let computedResponses;

          querySnapshot.forEach((doc) => {
            if (doc.id == this.$route.params.id) {
              computedResponses =
                doc.data().options.option1.value +
                doc.data().options.option2.value;
              this.questionName = doc.data().questionName;
              this.options.option1.name = doc.data().options.option1.name;
              this.options.option2.name = doc.data().options.option2.name;
              this.options.option1.value = doc.data().options.option1.value;
              this.options.option2.value = doc.data().options.option2.value;
              this.responses = doc.data().responses;
            }
          });
        } else {
          router.push({ name: "Home" });
        }
      });
    },
    selectOp1() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const pollsRef = doc(userRef, "polls", this.$route.params.id);
          const cpollsRef = collection(userRef, "polls");

          //if user already voted
          if (this.userResponse) {
            this.error = true;
            this.errorMessage = "You have already voted";
          } else {
            this.userResponse = true;

            const q = query(cpollsRef);
            const querySnapshot = await getDocs(q);
            let computedResponses;

            querySnapshot.forEach((doc) => {
              if (doc.id == this.$route.params.id) {
                computedResponses =
                  doc.data().options.option1.value +
                  doc.data().options.option2.value;
              }
            });

            await updateDoc(pollsRef, {
              responses: computedResponses,
            });

            await updateDoc(pollsRef, {
              responses: increment(1),
              "options.option1.value": increment(1),
            });

            this.success = true;

            // router.push({ name: "Dashboard" });
          }
        } else {
          // the user is not signed in
          router.push({ name: "Login" });
        }
      });
    },
    selectOp2() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const pollsRef = doc(userRef, "polls", this.$route.params.id);
          const cpollsRef = collection(userRef, "polls");

          //if user already voted
          if (this.userResponse) {
            this.error = true;
            this.errorMessage = "You have already voted";
          } else {
            this.userResponse = true;

            const q = query(cpollsRef);
            const querySnapshot = await getDocs(q);
            let computedResponses;

            querySnapshot.forEach((doc) => {
              if (doc.id == this.$route.params.id) {
                computedResponses =
                  doc.data().options.option1.value +
                  doc.data().options.option2.value;
              }
            });

            await updateDoc(pollsRef, {
              responses: computedResponses,
            });

            await updateDoc(pollsRef, {
              responses: increment(1),
              "options.option2.value": increment(1),
            });

            this.success = true;

            // router.push({ name: "Dashboard" });
          }
        } else {
          // the user is not signed in
          router.push({ name: "Login" });
        }
      });
    },
    copyUrl(){

        const url = window.location.href;
        alert('Copy this link to share : '+ url);
    }
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  min-width: 540px;
  height: 100vh;
}

.option1 {
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 40vh;
  border-radius: 5px;
  background-color: rgb(227, 255, 218);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.option1::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 5px;
  background-color: rgba(20, 241, 20, 0.658);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out;
}

.option1:hover {
  transform: scale(1.1, 1.1);
}

/* Fade in the pseudo-element with the bigger shadow */
.option1:hover::after {
  opacity: 1;
}

.option2 {
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 40vh;
  border-radius: 5px;
  background-color: rgb(227, 255, 218);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.option2::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 5px;
  background-color: rgba(20, 241, 20, 0.658);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out;
}

.option2:hover {
  transform: scale(1.1, 1.1);
}

/* Fade in the pseudo-element with the bigger shadow */
.option2:hover::after {
  opacity: 1;
}
.center-me {
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.errorMessage {
  color: red;
}
.successMessage {
    color: green;
}
</style>