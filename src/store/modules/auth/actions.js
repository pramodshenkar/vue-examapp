import axios from 'axios'
import router from './../../../routes'

export default {
  login(context, payload) {
        axios
        .post("http://localhost:5000/student/login", payload.credentials)
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
  }
}