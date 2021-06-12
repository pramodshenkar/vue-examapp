<template>
  <div>
        <p>{{course.coursename}}</p>
        {{course}}

      <div class="row">
      <div v-for="course in course.exams" :key="course.courseid">
        <div class="col">
          <div class="card">
            <h5 class="card-header">{{ course }}</h5>
            <div class="card-body">
              <div class="card-text">
                 <router-link class="nav-item nav-link" :to="`/examdashboard/${course.courseid}`"><button class="btn btn-info">Go to course</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// import { mapState } from "vuex";
// import store from "./../store/store";
import axios from 'axios'
export default {
  data() {
    return {
      course:{}
    };
  },
  computed: {
  },
  mounted() {
    this.getCourseInfo()
  },
  methods: {
    getCourseInfo(){
      axios
      .post("http://localhost:5000/course",{courseid :this.$route.params.courseid})
      .then((response) => {
        if (response.status == 200) {
          this.course = response.data.course
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error to fetch courses");
      });
    },
  },
};
</script>

<style>
</style>