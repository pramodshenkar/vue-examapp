<template>
  <div class="container mt-5">
    <div class="row">
      <h5>Hey {{ student.name }} !</h5>
    </div>
    <div class="row mb-4">
      <p>You are elected for the following exams as per your course</p>
    </div>
    <div class="row pt-4">
      <div v-for="report in reports" :key="report.examid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{ getExamName(report.examid) }}</h5>

            <div class="card-body">
              <div class="card-title">
                Your {{ attemptCounts(report.attemptreports) }} Attempts
                Remained
              </div>
              <div class="card-text">
                <router-link
                  class="nav-item nav-link"
                  :to="`/exam/${report.examid}`"
                >
                  <button
                    @click="onStartExam(report)"
                    :disabled="attemptCounts(report.attemptreports) == 0"
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
import store from "./../store/store";
import axios from "axios";
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
  beforeMount() {
    this.getCourseInfo()
      .then(() => {
        this.getAllExamReports();
        this.getAllExams();
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  methods: {
    async getCourseInfo() {
      await axios
        .post("http://localhost:5000/course", {
          courseid: this.$route.params.courseid,
        })
        .then((response) => {
          if (response.status == 200) {
            this.course = response.data.course;
          }
        })
        .catch((error) => {
          alert(error);
          alert(error.response.data.message);
        });
    },

    getAllExamReports() {
      for (let i = 0; i < this.course.exams.length; i++) {
        const element = this.course.exams[i];
        this.getExamReport(element);
      }
    },

    getExamReport(examid) {
      axios
        .post("http://localhost:5000/report", {
          studentid: this.student.studentid,
          courseid: this.$route.params.courseid,
          examid: examid,
        })
        .then((response) => {
          if (response.status == 200) {
            this.reports.push(response.data.examreport);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    getAllExams() {
      for (let i = 0; i < this.course.exams.length; i++) {
        const element = this.course.exams[i];
        this.getExam(element);
      }
    },
    getExam(examid) {
      axios
        .post("http://localhost:5000/exam", {
          courseid: this.$route.params.courseid,
          examid: examid,
        })
        .then((response) => {
          if (response.status == 200) {
            this.exams.push(response.data.exam);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    getExamName(examid) {
      for (let i = 0; i < this.exams.length; i++) {
        if (examid == this.exams[i].examid) {
          return this.exams[i].examname;
        }
      }
    },

    attemptCounts(attemptreport) {
      var count = 0;
      for (let i = 0; i < attemptreport.length; i++) {
        const element = attemptreport[i];
        if (element.issubmitted === false) {
          count = count + 1;
        }
      }
      return count;
    },
    onStartExam(report) {
      store.commit("report/setReport", { report: report });
    },
  },
};
</script>

<style>
</style>