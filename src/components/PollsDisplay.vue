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
              </div>
              <button
                type="button"
                class="btn col-12 btn-success"
                @click="createPoll"
              >
                Create Poll
              </button>

              <template #modal-footer="{ ok }">
                <b-button size="md" variant="danger" @click="ok()">
                  Close
                </b-button>
              </template>
            </b-modal>
          </b-button>
        </div>
      </div>
      <div class="row">
        <!-- <div class="previewPoll col-12" v-for="polls in userPolls">{{}}</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default {
  name: "PollsDisplay",
  components: {},
  data() {
    return {
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
  methods: {
    createPoll() {
      const userId = sessionStorage.getItem("userId");
      console.log("THIS FUNCTION CREATEPOLL IS BEING CALLED BY" + userId);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.centerMe{
    display: flex;
    justify-content: center;
}
</style>