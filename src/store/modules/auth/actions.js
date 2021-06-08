import axios from "axios";
 import router from "./../../../routes"

export default {
    signup(context) {
        axios
            .post("http://localhost:5000/signup", context.state.student)
            .then((response) => {
              this.response = response
              if(this.response.status==200){
                alert("Successfully Created Account.")
                router.push('/login') 
              }

            })
            .catch((error) => {
              console.log(error)
              alert("There was an error!");
            });
        },  
}