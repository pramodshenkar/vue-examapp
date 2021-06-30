import axios from 'axios'
import router from './../../../routes'

export default {
  async login(context, payload) {
        var isLoginSuccess = false
        await axios
        .post("http://localhost:5000/login", payload.credentials)
        .then((response) => {
          if (response.status == 200) {
            isLoginSuccess = true
            context.commit('setToken',{token:response.data.token})
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
        console.log(isLoginSuccess)

        if(isLoginSuccess){
          await axios
          .post("http://localhost:5000/learner", payload.credentials)
          .then((response) => {  
            if (response.status == 200) {
              context.commit('setStudent',{student:response.data.learner})
              alert("Successfully Logged In.");
              router.push("/dashboard");
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
  
        }
  }
}