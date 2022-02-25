<template>
  <div class="home">
    <div class="container">

      <div class="row justify-content-center">
        <div class="center-me col">
          <h1 class="surveyor">Suveyor</h1>
          <h3>Create polls within 30 seconds</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.surveyor{
  font-size: 10rem;
}
.center-me {
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>