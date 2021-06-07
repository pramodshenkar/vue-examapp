<template>
  <div>
    <p>Login</p>
    <div class="container">
      <form @submit.prevent="created" >
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  methods : {
    onLogin(){
      console.log("HEY")
      const user = {
        id:3,
        email:"AA",
        password:"AA"
      };
      axios.post("http://localhost:3000/users",user)
      .then(response => {
        console.log(response)
      });

    },
    created() {
 }
  }
};
</script>

<style>
</style>