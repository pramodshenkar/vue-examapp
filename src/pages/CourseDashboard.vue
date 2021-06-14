<template>
  <div>
    <!-- <p>{{ course }}</p> -->

    <!-- <p>{{ student }}</p> -->

    <!-- <p>{{ course.exams.length }}</p> -->

    <p v-for="report in reports" :key="report.examid">
      <!-- {{ report }} -->
    </p>

    <div class="row">
      <div v-for="report in reports" :key="report.examid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{ report.examid }}</h5>
            <div class="card-body">
              <div class="card-title">
                Your {{ attemptCounts(report.attemptreports) }} Attempts Remained
              </div>
              <div class="card-text">
                <router-link
                  class="nav-item nav-link"
                  :to="`/exam/${report.examid}`"
                >
                <button @click="onStartExam(report)" :disabled="attemptCounts(report.attemptreports)==0" class="btn btn-info">Start Exam</button>
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
      })
      .catch((error) => {
        console.log(error.message);
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
          console.log(error);
          alert("There was an error to fetch courses");
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
          console.log(error);
          alert("There was an error to fetch courses");
        });
    },

    attemptCounts(attemptreport) {
      var count=0;
      for (let i = 0; i < attemptreport.length; i++) {
        const element = attemptreport[i];
        if(element.issubmitted === false){
          count = count+1
        }
      }
      return count;
    },
    onStartExam(report){
      store.commit('report/setReport',{report:report})

    }
  },
};
</script>

<style>
</style>