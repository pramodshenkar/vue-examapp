import axios from 'axios'

export default {
    async getCourse(context,payload) {
    axios
      .post("http://localhost:5000/student/courses",{username :payload.username})
      .then((response) => {
        if (response.status == 200) {
          context.commit('setCourses',{
            courses : response.data.courses
          })
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error to fetch courses");
      });
  },
  async getReport(context,payload) {
    axios
      .post("http://localhost:5000/report",{username :payload.username})
      .then((response) => {
        if (response.status == 200) {
          console.log("call getReport in Action")
          // context.commit('setCourses',{
          //   report : response.data.report[0]
          // })
          context.commit('setReport',{
            report : response.data.report
          })

        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error to fetch courses");
      });
  }
}