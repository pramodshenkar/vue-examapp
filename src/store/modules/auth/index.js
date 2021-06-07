import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";


const authModule = {
    namespaced: true,
    state() {
        return {
            student :{
                email:"pramod@mail.com",
                name:"Pramod",
                college:"AVCOE",
                courses : [],
                password:"111",
                confirmPassword:"111"
            }
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}

export default authModule;
