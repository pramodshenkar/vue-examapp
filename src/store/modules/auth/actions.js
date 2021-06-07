import axios from "axios"
export default {
    signup(context) {
        console.log("Added Another data : ", context.state.student.name)
        // axios
        //     .post(`http://localhost:5000/signup`, {
        //         name: context.state.student.name,
        //         email: context.state.student.email,
        //         college: context.state.student.college,
        //         password: context.state.student.password
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        axios
            .post(`http://localhost:5000/hello`)
            .catch((error) => {
                console.log(error);
            });
    },
}