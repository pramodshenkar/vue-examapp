<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul v-if="student" class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item nav-link">
            <router-link class="nav-item nav-link" to="/dashboard"
              ><b>Welcome {{ student.learnername }}</b></router-link
            >
          </li>
        </ul>
        <ul v-else class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link class="nav-item nav-link" to="Signup"
              >Signup</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-item nav-link" to="Login"
              >Login</router-link
            >
          </li>
        </ul>

        <button
          v-if="student"
          @click.prevent="onLogout"
          class="btn btn-sm btn-secondary"
          type="submit"
        >
          Logout
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./../store/store";
export default {
  computed: {
    ...mapState({
      student: (state) => state.student.student,
    }),
  },
  methods: {
    onLogout() {
      store.commit("student/clearStudent");
      store.commit("student/clearToken");
      store.commit("course/clearCourses");
      store.commit("course/clearcurrentCourse");
      store.commit("report/clearReport");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>