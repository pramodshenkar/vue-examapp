<template>
  <div>
    <div class="row"></div>
    <div class="row">
      <div class="col-3">
        <div v-for="(question, i) in questions" :key="question">
          <div>
            <button @click="getQuestion(question)" class="btn btn-info m-1">
              Question {{ i + 1 }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-8 ml-3">
        <div class="card">
          <div class="card-header">{{ currentQuestion.questiontext }}</div>
          <div class="card-body">
            <!-- <h5 class="card-title">Special title treatment</h5> -->
            <div class="card-text">
              <div
                v-for="option in currentQuestion.options"
                :key="option.optionid"
              >
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="option"
                      :id=option.optionid
                      v-model="answer"
                    />
                    {{ option.optiontext }}
                  </label>
                </div>
              </div>
            </div>
            <button @click="onPreviousClicked" class="btn btn-warning">
              Previous
            </button>
            <button @click="onSubmitClicked" class="btn btn-primary">Submit Answer</button>
            <button @click="onNextClicked" class="btn btn-warning">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

// import store from "./../store/store";
export default {
  data() {
    return {
      questions: [],
      currentQuestion: {},
      currentQuestionNumber: 0,
      answer:''
    };
  },
  computed: {
    ...mapState({
      report: (state) => state.report.report,
      currentCourse: (state) => state.course.currentCourse,
    }),
  },
  beforeMount() {
    this.getQuestionsList()
      .then(() => {
        this.getQuestion(this.questions[this.currentQuestionNumber]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  methods: {
    async getQuestionsList() {
      await axios
        .post("http://localhost:5000/questions", {
          courseid: this.currentCourse.courseid,
          examid: this.$route.params.examid,
        })
        .then((response) => {
          if (response.status == 200) {
            this.questions = response.data.questions;
            // this.reports.push(response.data.examreport);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error to fetch courses");
        });
    },
    getQuestion(questionid) {
      axios
        .post("http://localhost:5000/question", {
          courseid: this.currentCourse.courseid,
          questionid: questionid,
        })
        .then((response) => {
          if (response.status == 200) {
            this.currentQuestion = response.data.question;
            // this.reports.push(response.data.examreport);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error to fetch courses");
        });
    },
    onPreviousClicked() {
      if (this.currentQuestionNumber != 0) {
        this.currentQuestionNumber = this.currentQuestionNumber - 1;
      } else {
        this.currentQuestionNumber = this.questions.length - 1;
      }
      console.log(this.currentQuestionNumber);
      this.getQuestion(this.questions[this.currentQuestionNumber]);
      this.answer = false
    },
    onNextClicked() {
      if (this.currentQuestionNumber != this.questions.length - 1) {
        this.currentQuestionNumber = this.currentQuestionNumber + 1;
      } else {
        this.currentQuestionNumber = 0;
      }
      console.log(this.currentQuestionNumber);
      this.getQuestion(this.questions[this.currentQuestionNumber]);
            this.answer = false

    },
    onSubmitClicked(){
      console.log("Submitting Answer")
      this.onNextClicked()
      
    }
  },
};
</script>

<style>
</style>