<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="card p-5">
          <div class="card-body">
            <div class="card-text">
              <form @submit.prevent="onSignup">
                <!-- email -->
                <div class="form-group row">
                    <input
                      type="email"
                      class="form-control"
                      v-model="student.email"
                      placeholder="Email"
                      required
                    />
                </div>
                <!-- learnername -->
                <div class="form-group row">
                    <input
                      type="text"
                      class="form-control"
                      v-model="student.learnername"
                      placeholder="Name"
                      required
                    />
                </div>
                <!-- college -->
                <div class="form-group row">
                    <input
                      type="text"
                      class="form-control"
                      v-model="student.college"
                      placeholder="College"
                      required
                    />
                </div>
                <!-- courses -->
                <div class="form-group row">
                    <select
                      class="custom-select"
                      aria-label="Default select example"
                      v-model="course"
                      placeholder="as"
                      required
                    >
                      <option value="" disabled selected>Select Course</option>

                      <option
                        v-for="course in courses"
                        :key="course.id"
                        :value="course"
                      >
                        {{ course.coursename }}
                      </option>
                    </select>
                </div>
                <!-- username -->
                <div class="form-group row">
                    <input
                      type="text"
                      class="form-control"
                      v-model="student.username"
                      placeholder="Name"
                      required
                    />
                </div>
                <!-- password -->
                <div class="form-group row">
                    <input
                      type="password"
                      class="form-control"
                      v-model="student.password"
                      placeholder="Password"
                      required
                    />
                </div>
                <!-- confirm password -->
                <div class="form-group row">
                    <input
                      type="password"
                      class="form-control"
                      v-model="student.confirmPassword"
                      placeholder="Confirm Password"
                      required
                    />
                </div>
                <!-- signup button -->
                <div class="form-group row">
                  <div>
                    <button type="submit" class="btn btn-primary">
                      Signup
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {
        learnername: "Pramod",
        username: "pramods11",
        password: "111",
        confirmPassword: "111",
        college: "AVCOE",
        email: "parmod@mail.com",
        courses: [],
      },
      courses: [],
      course: {},
    };
  },
  watch: {
    course() {
      this.student.courses[0] = this.course;
    },
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    onSignup() {
      console.log(this.student.courses)
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
          alert(error.response.data.message);
        });
    },
    getCourse() {
      axios
        .get("http://localhost:5000/courses")
        .then((response) => {
          if (response.status == 200) {
            this.courses = response.data.courses;
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

<style scoped>
.card {
    box-shadow: 10px 10px 30px 1px #888888;
}
</style>