import axios from 'axios'

export default {
  getCourse(context,payload) {
    axios
      .post("http://localhost:5000/student/courses",{username :payload.username})
      .then((response) => {
        if (response.status == 200) {
          console.log(context.state.courses)
          context.state.courses = response.data.courses;
          console.log(context.state.courses)
          console.log(response.data.courses)
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error to fetch courses");
      });
  },
}