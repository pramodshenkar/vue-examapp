<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <h1><b>Dashboard</b></h1>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-6 mb-4">
        <p>Here are courses you picked!!!</p>
      </div>
      <div class="col-6">
        <button @click="onButtonClick" class="btn btn-info">CALL API</button>
      </div>
    </div>
    <div class="row"></div>

    <div class="row">
      <div v-for="course in courses" :key="course.courseid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{ course.coursename }}</h5>
            <div class="card-body">
              <div class="card-text">
                <router-link
                  class="nav-item nav-link"
                  :to="`/course/${course.courseid}`"
                  ><button @click="onGotoCourse(course)" class="btn btn-info">
                    Go to course
                  </button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./../store/store";
import axios from "axios";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student,
      token: (state) => state.student.token,
      courses: (state) => state.course.courses,
    }),
  },
  mounted() {
    this.getStudentCourses();
  },
  methods: {
    getStudentCourses() {
      store.dispatch("course/getCourse", { username: this.student.username });
    },
    onGotoCourse(course) {
      store.commit("course/setCurrentCourse", { currentCourse: course });
    },
    onButtonClick() {
     axios
        .post("http://localhost:5000/dashboard",
          {},
          {
            headers: {
              Authorization: this.token
            }
          }
        )
        .then((response) => {
          if (response.status == 200) {
            alert(this.token);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>