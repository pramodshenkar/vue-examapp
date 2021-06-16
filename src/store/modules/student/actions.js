import axios from 'axios'
import router from './../../../routes'

export default {
  async login(context, payload) {
        await axios
        .post("http://localhost:5000/student/login", payload.credentials)
        .then((response) => {
          if (response.status == 200) {
            context.commit('setStudent',{student:response.data.result.student})
            context.commit('setToken',{token:response.data.result.token})
            alert("Successfully Logged In.");
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
  }
}