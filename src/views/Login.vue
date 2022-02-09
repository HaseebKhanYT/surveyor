<template>
  <div class="login">
    <h1>This is a login page</h1>
    
    <LoginBlock/>
    
  </div>
</template>

<script lang="ts">
import LoginBlock from "@/components/LoginBlock.vue";
export default {
  name: "login",
  components: { LoginBlock },
};
</script>