<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <p>Dashboard</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p>Welcome {{ student.name }}</p>
      </div>
    </div>
    <div class="row">
    </div>

    <div class="row">
      <div v-for="course in courses" :key="course.courseid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{ course.coursename }}</h5>
            <div class="card-body">
              <div class="card-text">
                <!-- <router-link class="nav-item nav-link" :to="`/course/${course.courseid}`"><button class="btn btn-info">Go to course</button></router-link> -->
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
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student,
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
    
  },
};
</script>

<style>
</style>