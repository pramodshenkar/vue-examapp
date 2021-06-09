<template>
  <div>
    <p>Login</p>

    <div class="container">
      <form @submit.prevent="onLogin">
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="credentials.username"
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
              v-model="credentials.password"
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
import { mapActions, mapState } from "vuex";
import store from "./../store/store"
export default {
  data() {
    return {
      credentials: {
        username: "pramods11",
        password: "111",
      },
    };
  },
  computed: {
    ...mapState({
      student: (state) => state.auth.student,
    }),
  },
  methods: {
    ...mapActions({
      login : 'auth/login'
    }),
    onLogin() {
      store.dispatch('auth/login',{credentials:this.credentials})
    },
  },
};
</script>

<style>
</style>