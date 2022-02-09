<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'Home'}">Form-Creator</router-link>
      <ul class="navbar-nav ">
        <li class="nav-item">
          <router-link class="navbar-link" to="/login">LogIn</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

.navbar-link {
  text-decoration: none;
}
</style>
