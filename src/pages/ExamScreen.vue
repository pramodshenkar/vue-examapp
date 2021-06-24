<template>
  <div>
    <div>
      <!-- The sidebar -->
      <div class="sidebar">
        <div v-for="(question, i) in questions" :key="question">
          <a @click="getQuestion(question, i)"> Question {{ i + 1 }} </a>
        </div>
        <a class="active btn-info" @click="$router.push('/dashboard')">
          End Exam
        </a>
      </div>

      <!-- Page content -->
      <div class="content">
        <div class="col-*">
          <div class="card">
            <div class="card-header">
              Q{{ currentQuestionNumber + 1 }}.
              {{ currentQuestion.questiontext }}
              <div v-html="renderMedia()"></div>
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
                        v-if="currentQuestion.questiontype == 'mcq-multianswer'"
                        type="checkbox"
                        class="form-check-input"
                        name="option"
                        :value="option.optionid"
                        v-model="answers[currentQuestionNumber]"
                      />
                      <input
                        v-else
                        type="radio"
                        class="form-check-input"
                        name="option"
                        :value="[option.optionid]"
                        v-model="answers[currentQuestionNumber]"
                      />
                      {{ option.optiontext }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row p-3">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button @click="onPreviousClicked" class="btn btn-primary">
                    Previous
                  </button>
                  <button
                    @click="onSubmitClicked(currentQuestion.questionid)"
                    class="btn btn-secondary"
                  >
                    Submit Answer
                  </button>
                  <button @click="onNextClicked" class="btn btn-primary">
                    Next
                  </button>
                </div>
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
import { BASEURL } from "./../main"

export default {
  data() {
    return {
      questions: [],
      currentQuestion: {},
      currentQuestionNumber: 0,
      answers: [],
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
        this.getQuestion(
          this.questions[this.currentQuestionNumber],
          this.currentQuestionNumber
        );
        this.initializeAnswers()

      })
      .catch((error) => {
        alert(error.message);
      });
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? Exam will be get submitted!"
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
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    getQuestion(questionid, questionno) {
      this.currentQuestionNumber = questionno;
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
          alert(error.response.data.message);
        });
    },

    initializeAnswers(){
      this.answers = new Array(this.questions.length).fill([]);
    },

    onSubmitAnswer(questionid) {
      // console.table("studentid : ",this.student.studentid,"\ncourseid : ",this.currentCourse.courseid,"\nexamid :",this.$route.params.examid,"\nquestionid : ",questionid,"\nanswer : ",this.answers[this.currentQuestionNumber])
      // console.log(this.answers[this.currentQuestionNumber]);
      axios
        .post("http://localhost:5000/submitanswer", {
          studentid: this.student.studentid,
          courseid: this.currentCourse.courseid,
          examid: this.$route.params.examid,
          questionid: questionid,
          answerid: this.answers[this.currentQuestionNumber],
        })
        .then((response) => {
          if (response.status == 200) {
            if (!response.data.SubmitAnswer) {
              alert("Cant save answer");
            }
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
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
            alert("exam ended");
            this.$router.go(-1);
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    onPreviousClicked() {
      if (this.currentQuestionNumber != 0) {
        this.currentQuestionNumber = this.currentQuestionNumber - 1;
      } else {
        this.currentQuestionNumber = this.questions.length - 1;
      }
      this.getQuestion(
        this.questions[this.currentQuestionNumber],
        this.currentQuestionNumber
      );
    },
    onNextClicked() {
      if (this.currentQuestionNumber != this.questions.length - 1) {
        this.currentQuestionNumber = this.currentQuestionNumber + 1;
      } else {
        this.currentQuestionNumber = 0;
      }
      this.getQuestion(
        this.questions[this.currentQuestionNumber],
        this.currentQuestionNumber
      );
    },
    onSubmitClicked(questionid) {
      this.onSubmitAnswer(questionid);
      this.onNextClicked();
    },
    renderMedia() {
      if (this.currentQuestion.filetype == "image") {
        return '<img src="'+ BASEURL + this.currentQuestion.mediapath + '">';

      } else if (this.currentQuestion.filetype == "audio") {
        return (
          '<audio controls src="' + BASEURL +
          this.currentQuestion.mediapath +
          '">Your browser does not support the<code>audio</code> element</audio>'
        );
      } else if (this.currentQuestion.filetype == "video") {
        return (
          '<video controls width="250"><source src="' + BASEURL +
          this.currentQuestion.mediapath +
          '" type="video/mp4"> Sorry, your browser doesnt support embedded videos. </video>'
        );
      }
    },
  },
};
</script>

<style scopped>
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #cbd4d3;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 5% 5%;
}
</style>