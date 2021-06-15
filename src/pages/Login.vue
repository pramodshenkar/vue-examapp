<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-6"></div>
        <div class="card p-5">
          <div class="card-body">
            <div class="card-text">
              <form @submit.prevent="onLogin">
                <div class="form-group row">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="credentials.username"
                    />
                </div>
                <div class="form-group row">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      v-model="credentials.password"
                    />
                </div>
                <div class="form-group row">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import store from "./../store/store";
export default {
  data() {
    return {
      credentials: {
        username: "pramods11",
        password: "111",
      },
    };
  },
  // computed: {
  //   ...mapState({
  //     learner: (state) => state.auth.learner,
  //   }),
  // },
  methods: {
    onLogin() {
      store.dispatch("student/login", { credentials: this.credentials });
    },
  },
};
</script>

<style scoped>
.card {
    box-shadow: 10px 10px 30px 1px #888888;
}
</style>