<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-11">
        <p>Dashboard</p>
      </div>
      <div class="col-1">
        <button class="btn" @click.prevent="onLogout">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p>Welcome {{ student.name }}</p>  
      </div>
    </div>

    You enrolled to course :
    <div v-for="course in courses" :key="course.courseid">
      <div v-for="studentcourse in student.courses" :key="studentcourse">
        <div v-if="course.courseid == studentcourse">
          {{ course.coursename }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./../store/store"
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student ,
      courses: (state) => state.course.courses,
    }),
  },
  mounted() {
    this.getStudentCourses()
  },
  methods: {
    getStudentCourses(){
      store.dispatch('course/getCourse',{username:this.student.username})
    },
    onLogout(){
      store.commit('student/clearStudentData')
      store.commit('course/clearCoursesData')
      this.$router.push('/login')
    }
  },
};
</script>

<style>
</style>