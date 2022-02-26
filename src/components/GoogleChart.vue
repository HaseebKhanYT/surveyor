<template>
  <div class="justify-content-center" >
    <GChart class="google-chart" type="PieChart" :data="dataChart" :resizeDebounce="500"/>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue';

import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  onSnapshot,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../main";
import router from "@/router";

export default Vue.extend({
  name: "Chart",
  components: {
  },
  data() {
    return {
      dataChart: [],
      options: {
        width: 600,
        height: 300,
      },
      userName: "",
      userId: "",
      loggedIn: false,
      pollId: "",
      responses: 0,
      questionName: "",
      option: {
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
    this.updateChart();
  },
  methods: {
    updateChart() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          //   const pollsRef = doc(userRef, "polls");
          const cPollsRef = collection(userRef, "polls");

          const q = query(cPollsRef);
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            if (doc.id === this.$route.params.id) {
              const option1Name = doc.data().options.option1.name;
              const option2Name = doc.data().options.option2.name;
              const option1Value = doc.data().options.option1.value;
              const option2Value = doc.data().options.option2.value;
              const responses = doc.data().responses;
              const dataPoll = [
                ["Options", "Value"],
                [option1Name, option1Value],
                [option2Name, option2Value],
              ];
              this.dataChart = dataPoll as any;
            }
          });

          //   const docSnap = await getDoc(pollsRef);
          //   if (docSnap.exists()) {
          //     console.log("Document data:", docSnap.data());
          //   } else {
          //     // doc.data() will be undefined in this case
          //     console.log("No such document!");
          //   }


          //   const unsub = onSnapshot(cPollsRef, (querySnapshot) => {
          //     const currentPoll = querySnapshot.docs.find(
          //       (poll: { id: string }) => poll.id == this.$route.params.id
          //     );
          // console.log(currentPoll?.data());
          // const questionName = currentPoll?.data().questionName;
          // const option1Name = currentPoll?.data().options.option1.name;
          // const option2Name = currentPoll?.data().options.option2.name;
          // const option1Value = currentPoll?.data().options.option1.value;
          // const option2Value = currentPoll?.data().options.option2.value;
          // const responses = currentPoll?.data().responses;

          // const dataPoll = [
          //   ["Options", "Value"],
          //   [option1Name, option1Value],
          //   [option2Name, option2Value],
          // ];
          //     console.log(dataPoll);
          //     this.dataChart = dataPoll as any;
          //   });
        } else {
          router.push({ name: "Home" });
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>

    .google-chart{
        width: 100%;
        height: 300px;
    }
</style>
    
