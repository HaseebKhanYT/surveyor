<template>
  <div class="dashboard">
    <div class="container dashboard-container mx-auto">
      <div class="row justify-content-between pt-3 mb-3">
        <div class="col-6">
          <h2>Your Polls</h2>
        </div>
        <div class="col-6">
          <b-button
            v-b-modal.modal-1
            variant="success"
            id="createModalButton"
            class="float-right"
          >
            Create Poll
            <b-modal id="modal-1" centered title="Create Poll">
              <div class="container">
                <div class="row mb-3">
                  <label for="question" class="col-4 col-form-label"
                    >Question</label
                  >
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="questionName"
                      placeholder="who is good?"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="option" class="col-4 col-form-label"
                    >Option 1</label
                  >
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="options.option1.name"
                      placeholder="Haseeb"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="option" class="col-4 col-form-label"
                    >Option 2</label
                  >
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="options.option2.name"
                      placeholder="Ali"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    type="button"
                    class="btn col-12 btn-success"
                    @click="createPoll"
                  >
                    Create Poll
                  </button>
                </div>
              </div>

              <template #modal-footer="{ ok }">
                <b-button size="md" variant="danger" @click="ok()">
                  Close
                </b-button>
              </template>
            </b-modal>
          </b-button>
        </div>
      </div>
      <div class="row previewPoll">
        <!-- <div class="noPollsMessage col-12" v-show="noOfPolls == 0">
          There are no Polls
        </div> -->
        <div
          v-for="poll in showPolls.polls"
          :key="poll.pollId"
        >
          <div class="screen-card mt-4">
            <div class="col-md-6 float-left">
              <h4 class="align-left">
                {{ poll.questionName }}
              </h4>
            </div>
            <div class="col-md-6 float-right">
              <router-link
                :to="{ name: 'Analytics', params: { id: poll.pollId } }"
              >
                <button type="button" class="btn mx-2 float-right btn-primary">
                  Analytics
                </button>
              </router-link>
              <router-link
                :to="{ name: 'Polls', params: { id: poll.pollId } }"
              >
                <button type="button" class="btn mx-2 float-right btn-outline-success">
                  Open
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../main";
import router from "@/router";

export default Vue.extend({
  name: "PollsDisplay",
  components: {},
  data() {
    return {
      userName: "",
      userId: "",
      loggedIn: false,
      showPolls: {
        noOfPolls: 0,
        polls: [],
      },

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
    this.displayPolls();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // If user is signed in
          this.loggedIn = true;
          this.userId = user.uid;

          const userRef = doc(db, "users", this.userId);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            this.userName = docSnap.data().userName;
          }
        } else {
          // If user is not signed in
          // add a pop up saying you need to sign in to access the page
          router.push({ name: "Home" });
        }
      });
    },

    async createPoll() {
      const userRef = doc(db, "users", this.userId);
      const pollsRef = collection(userRef, "polls");

      const docRef = await addDoc(pollsRef, {
        // adds a new poll document in the collection
        questionName: this.questionName,
        options: this.options,
        responses: 0,
      });
      console.log("Poll collection Created in the database with : ", docRef.id);
    },

    displayPolls() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", this.userId);
          const pollsRef = collection(userRef, "polls");

          const unsub = onSnapshot(pollsRef, (querySnapshot) => {
            const polls: any[] = [];
            console.log(querySnapshot.docs[0]);

            querySnapshot.forEach((doc) => {
              const pollData = {
                ...doc.data(),
                pollId: doc.id,
              };
              polls.push(pollData);
            });
            this.showPolls.noOfPolls = polls.length;
            this.showPolls.polls = polls as any;

            // const changes = querySnapshot.docChanges();

            // changes.forEach((change) => {
            //   if (change.type == "added") {
            //     this.showPolls.polls.push({
            //       ...change.doc.data(),
            //       pollId: change.doc.id,
            //     });
            //   }
            // });
          });
        } else {
          router.push({ name: "Home" });
        }
      });
    },
    routeToPollAnalytics() {},
  },
});
</script>

<style lang="scss" scoped>
.screen-card {
  font-weight: bold;
  border-radius: 0px;
  cursor: pointer;
  box-shadow: 3px 3px 0px 0px #efefef;
}
.dashboard-container {
  width: 80%;
  height: 100vh;
}
h1,
h2 {
  text-align: left;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.centerMe {
  display: flex;
  justify-content: center;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
</style>