import axios from 'axios'
import router from '../../../routes'

export default {
  login(context, payload) {
        axios
        .post("http://localhost:5000/login", payload.credentials)
        .then((response) => {
          if (response.status == 200) {
            context.state.student = response.data.student
            alert("Successfully Logged In.");
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error!");
        });
  },
  getCourse(context) {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        if (response.status == 200) {
          context.state.courses = response.data.courses;
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error to fetch courses");
      });
  },
}