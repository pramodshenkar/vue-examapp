<template>
  <div>
    <p>Exam dashboard</p>
    <p>{{course.coursename}}</p>
    <div>
      {{course.exams}}
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
    }
  },
};
</script>

<style>
</style>