<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <p>Dashboard</p>
      </div>
      <div class="col flex-row-reverse">
        <button class="btn" @click.prevent="onLogout">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p>Welcome {{ student.name }}</p>
      </div>
    </div>

    <div class="row">
      <div v-for="course in courses" :key="course.courseid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{course.coursename}}</h5>
            <div class="card-body">
              <p class="card-text">
                Remaining Test Count : 3
              </p>
              <a href="#" class="btn btn-primary">Start Test</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      {{report}}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./../store/store";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student,
      courses: (state) => state.course.courses,
      report: (state) => state.course.report,
    }),
  },
  mounted() {
    this.getStudentCourses()
    this.getStudentReport()
  },
  methods: {
    getStudentCourses() {
      store.dispatch("course/getCourse", { username: this.student.username });
    },
    getStudentReport(){
       store.dispatch("course/getReport", { username: this.student.username });
    },
    onLogout() {
      store.commit("student/clearStudentData");
      store.commit("course/clearCoursesData");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>