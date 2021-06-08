<template>
  <div>
    <p>Signup</p>
    <div class="container">
      <form @submit.prevent="onSignup">
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="email"
              class="form-control"
              v-model="student.email"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.name"
              placeholder="Name"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.college"
              placeholder="College"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.username"
              placeholder="Name"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="password"
              class="form-control"
              v-model="student.password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="password"
              class="form-control"
              v-model="student.confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
 import axios from "axios";
export default {
  data() {
    return {
      student :{
                email:"parmod@mail.com",
                name:"Pramod",
                username:"pramods11",
                college:"AVCOE",
                courses : [],
                password:"111",
                confirmPassword:"111"
            },
    };
  },
  methods: {
    onSignup() {
    axios
            .post("http://localhost:5000/signup", this.student)
            .then((response) => {
              this.response = response
              if(this.response.status==200){
                alert("Successfully Created Account.")
                this.$router.push('/login') 
              }

            })
            .catch((error) => {
              console.log(error)
              alert("There was an error!");
            });
  },
},
}
</script>

<style>
</style>