<template>
  <div>
    <div class="row">
      {{report}}
    </div>
    <div class="row">
      <div class="col-3">
        <div class="card" style="width: 18rem">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
      <div class="col-8 ml-3">
        <div class="card">
          <div class="card-header">Featured</div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import store from "./../store/store";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      report: (state) => state.report.report,
    }),
  },
  mounted() {
    // this.getStudentCourses();
  },
  methods: {
    // getStudentCourses() {
    //   store.dispatch("course/getCourse", { username: this.student.username });
    // },
  },
};
</script>

<style>
</style>