<template>
  <div>
    <div class="row"></div>
    <div class="row">
      <div class="col-3">
        <div v-for="(question, i) in questions" :key="question">
          <button @click="getQuestion(question)" class="btn btn-info m-1">
            Question {{ i + 1 }}
          </button>
        </div>
        <hr />
        <div>
          <button @click="onEndExamClicked" class="btn btn-dark">
            End Exam
          </button>
        </div>
      </div>
      <div class="col-8 ml-3">
        <div class="card">
          <div class="card-header">
            Q{{ currentQuestionNumber + 1 }}. {{ currentQuestion.questiontext }}
          </div>
          <div class="card-body">
            <div class="card-text ml-4">
              <div
                class="row"
                v-for="option in currentQuestion.options"
                :key="option.optionid"
              >
                <div class="form-check m-1">
                  <label class="form-check-label">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="option"
                      :value="option.optionid"
                      v-model="answer"
                    />
                    {{ option.optiontext }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row p-3">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button @click="onPreviousClicked" class="btn btn-secondary">
                  Previous
                </button>
                <button
                  @click="onSubmitClicked(currentQuestion.questionid)"
                  class="btn btn-danger"
                >
                  Submit Answer
                </button>
                <button @click="onNextClicked" class="btn btn-secondary">
                  Next
                </button>
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
import axios from "axios";

// import store from "./../store/store";
export default {
  data() {
    return {
      questions: [],
      currentQuestion: {},
      currentQuestionNumber: 0,
      answer: "",
    };
  },
  computed: {
    ...mapState({
      student: (state) => state.student.student,
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
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? Exam will be automatically get submitted!"
    );
    if (answer) {
      this.onEndExamClicked()
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      next(false);
    }
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
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error to fetch courses");
        });
    },
    onSubmitAnswer(questionid) {
      axios
        .post("http://localhost:5000/submitanswer", {
          studentid: this.student.studentid,
          courseid: this.currentCourse.courseid,
          examid: this.$route.params.examid,
          questionid: questionid,
          answerid: this.answer,
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.SubmitAnswer) {
              console.log("Answer Saved");
            } else {
              console.log("Cant save answer");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error to fetch courses");
        });
    },
    async onEndExamClicked() {
      await axios
        .post("http://localhost:5000/endexam", {
          studentid: this.student.studentid,
          courseid: this.currentCourse.courseid,
          examid: this.$route.params.examid,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("exam ended");
            this.$router.go(-1);
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
      this.getQuestion(this.questions[this.currentQuestionNumber]);
      this.answer = false;
    },
    onNextClicked() {
      if (this.currentQuestionNumber != this.questions.length - 1) {
        this.currentQuestionNumber = this.currentQuestionNumber + 1;
      } else {
        this.currentQuestionNumber = 0;
      }
      this.getQuestion(this.questions[this.currentQuestionNumber]);
      this.answer = false;
    },
    onSubmitClicked(questionid) {
      this.onSubmitAnswer(questionid);
      this.onNextClicked();
    },
  },
};
</script>

<style>
</style>