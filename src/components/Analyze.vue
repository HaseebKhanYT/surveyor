<template>
  <div class="dashboard">
    <div class="container dashboard-container mx-auto">
      <div class="row justify-content-between pt-3 mb-3">
        <div class="col-6">
          <h2>{{ this.questionName }}</h2>
        </div>
        <div class="col-6"> Responses: {{this.responses}}</div>
        <div class="row">
          <div>
              <GoogleChart/>
              <button
            type="button"
            class="btn mx-3 btn-info"
            @click="copyUrl"
          >
            Share this poll result
          </button>
            <!-- <GChart type="PieChart" :options="chartOptions" :data="chartData" /> -->
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
  setDoc,
  collection,
  where,
  getDocs,
  query,
  updateDoc,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../main";
import router from "@/router";
import GoogleChart from "./GoogleChart.vue";

export default {
  name: "Analyze",
  components: { GoogleChart },
  data() {
    return {
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
      chartData: [["Option", "Value"],
      ['yes', 10],
      ['no', 9],
      ],
      chartOptions: {
        width: 1100,
        height: 400,
      },
    };
  },
  computed: {
    pollIdReturner() {
      return this.$route.params.id;
    },
  },
  created() {
    this.checkAuth();
    this.updatePollData();
  },
  methods: {
    checkAuth() {
      // add same user and poll admin checker
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
          router.push({ name: "Home" });
        }
      });
    },

    updatePollData() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", this.userId);
            const pollsRef = doc(userRef, "polls", this.$route.params.id);
          const cPollsRef = collection(userRef, "polls");
          const gChartOptions: any = [['Options', 'Votes']];

          const q = query(cPollsRef);
            const querySnapshot = await getDocs(q);
            let computedResponses;

            querySnapshot.forEach((doc)=>{
                if(doc.id == this.$route.params.id){
                    computedResponses = doc.data().options.option1.value + doc.data().options.option2.value;

                }
            });

            await updateDoc(pollsRef,{
                responses : computedResponses,
            });

          const unsub = onSnapshot(cPollsRef, (querySnapshot) => {
            const currentPoll = querySnapshot.docs.find(
              (poll) => poll.id == this.pollIdReturner
            );

            // console.log(currentPoll?.data());
            this.questionName = currentPoll?.data().questionName;
            this.options.option1.name = currentPoll?.data().options.option1.name;
            this.options.option2.name = currentPoll?.data().options.option2.name;
            this.options.option1.value = currentPoll?.data().options.option1.value;
            this.options.option2.value = currentPoll?.data().options.option2.value;
            this.responses = currentPoll?.data().responses;
            
            // gChartOptions.push([
            //   this.options.option1.name,
            //   this.options.option1.value
            // ]);
            
            
            // gChartOptions.push([
            //   this.options.option2.name,
            //   this.options.option2.value
            // ]);
            // console.log(gChartOptions);
            
            this.chartData = [['Options', 'Value'],
            [this.options.option1.name, this.options.option1.value],
            [this.options.option2.name, this.options.option2.value]
            ];
          });
        } else {
          router.push({ name: "Home" });
        }
      });
    },
    copyUrl(){

        const url = window.location.href;
        alert('Copy this link to share : '+ url);
    }
  },
};
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