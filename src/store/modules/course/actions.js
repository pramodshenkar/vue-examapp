import axios from 'axios'

export default {
  getCourse(context,payload) {
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
}