<template>
  <div class="dashboard">
    <div class="container mx-auto">
      <div class="row">
        <h1>Analytics</h1>
        <Analyze/>
        <!-- <GoogleChart/> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Analyze from '@/components/Analyze.vue';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, onSnapshot} from "firebase/firestore";
import { auth, db } from "../main";
import router from "@/router";
// import {GChart} from 'vue-google-charts';
import GoogleChart from '@/components/GoogleChart.vue'

export default {
  name: "dashboard",
  components: {
    Analyze, GoogleChart
  },
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
      chartData: [['Options', 0]],
      chartOptions: {
        width: 1100,
        height: 400,
      },
    };
  },
  created() {
    this.checkAuth();
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
          const userRef = doc(db, "users", this.userId);
          const pollsRef = collection(userRef, "polls");
          const gChartOptions: any = [['Options', 'Votes']];

          const unsub = onSnapshot(pollsRef, (querySnapshot) => {
            const currentPoll = querySnapshot.docs.find(
              (poll) => poll.id == this.$route.params.id
            );

            console.log(currentPoll?.data());
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
            
            this.chartData = [
            [this.options.option1.name, this.options.option1.value],
            [this.options.option2.name, this.options.option2.value]
            ];
          });
        } else {
          router.push({ name: "Home" });
        }
      });
    },
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