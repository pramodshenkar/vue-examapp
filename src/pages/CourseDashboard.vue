<template>
  <div class="container mt-5">
    <div class="row">
      <h5>Hey {{ student.learnername }} !</h5>
    </div>
    <div class="row mb-4">
      <p>You are elected for the following exams as per your course</p>
    </div>
    <div class="row pt-4">
      <div v-for="(exam,index) in student.courses[this.$route.params.courseid].exams" :key="exam.examid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{exam.examname}}</h5>

            <div class="card-body">
              <div class="card-title">
                <!-- Your {{ attemptCounts(report.attemptreports) }} Attempts -->
                Remained
              </div>
              <div class="card-text">
                <router-link
                  class="nav-item nav-link"
                  :to="`/course/${0}/${index}`"
                >
                  <button
                    @click="onStartExam()"
                    class="btn btn-info"
                  >
                    Start Exam
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import store from "./../store/store";
// import axios from "axios";
export default {
  data() {
    return {
      course: {},
      reports: [],
      exams: [],
    };
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student,
    }),
  },

methods: {
    onStartExam() {
      console.log("OnstartExam")
    },
  },
};
</script>

<style>
</style>