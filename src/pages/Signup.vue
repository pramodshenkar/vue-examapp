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
        <div class="form-group col-md-4">
          <p class="font-weight-bold">Select Courses</p>
          <div class="form-check">
            <label class="form-check-label" for="check1">
              <input
                type="checkbox"
                class="form-check-input"
                id="check1"
                name="option1"
                value="something"
              />Math
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label" for="check2">
              <input
                type="checkbox"
                class="form-check-input"
                id="check2"
                name="option2"
                value="something"
              />English
            </label>
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" />Science
            </label>
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
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      response : {}
    };
  },
  computed: {
    ...mapState({
      student: (state) => state.auth.student,
    }),
  },
  methods: {
    ...mapActions({
      signup: "auth/signup",
    }),
    onSignup() {
    this.signup()
  },
},
}
</script>

<style>
</style>