<template>
  <div>
    <p>Signup</p>
    <div class="container">
      <form @submit.prevent="onSignup">
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="email"
              class="form-control"
              v-model="student.email"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.name"
              placeholder="Name"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.college"
              placeholder="College"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-1-12">
            <select
              class="custom-select"
              aria-label="Default select example"
              v-model="courseid"
              placeholder="as"
              required
            >
                <option value="" disabled selected>Select Course</option>

              <option
                v-for="course in courses"
                :key="course.id"
                :value="course.courseid"
              >
                {{ course.coursename }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="text"
              class="form-control"
              v-model="student.username"
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="password"
              class="form-control"
              v-model="student.password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-1-12">
            <input
              type="password"
              class="form-control"
              v-model="student.confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <div>
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      student: {
        email: "parmod@mail.com",
        name: "Pramod",
        username: "pramods11",
        college: "AVCOE",
        courses: [],
        password: "111",
        confirmPassword: "111",
      },
      courses: [],
      courseid: "",
    };
  },
  watch: {
    courseid() {
      this.student.courses.push(this.courseid);
    },
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    onSignup() {
      axios
        .post("http://localhost:5000/signup", this.student)
        .then((response) => {
          this.response = response;
          if (this.response.status == 200) {
            alert("Successfully Created Account.");
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error!");
        });
    },
    getCourse() {
      axios
        .get("http://localhost:5000/courses")
        .then((response) => {
          this.response = response;
          if (this.response.status == 200) {
            this.courses = response.data.courses;
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