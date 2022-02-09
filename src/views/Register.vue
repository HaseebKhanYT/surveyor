<template>
  <div class="register">
    <div class="container">
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@doglapan.com"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Password</label
          >
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="password" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Confirm Password</label
          >
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="confirm password" />
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-sm-2">
            
          </div>
          <div class="col-sm-10">
            <button id="loginButton" type="button" class="btn btn-success">Sign Up</button>
          </div>
        </div >
        <div class="row mb-3">
          <div class="col-sm-2">

          </div>
          <div class="col-sm-10">

          <p class="account-exist-message">
            Already have an account?
            <strong
              ><router-link to="/login"> Login here </router-link></strong
            >
          </p>

          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "register",
  components: {},
};
</script>

<style lang="scss">
.register {
  position: relative;
  height: 100vh;
  background-color: #f9fafb;
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

#loginButton {
  width: 100%;
}
</style>