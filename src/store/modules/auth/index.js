import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
// import router from './router'



const authModule = {
    namespaced: true,
    state() {
        return {
            student :{
                email:"parmod@mail.com",
                name:"Pramod",
                username:"pramods11",
                college:"AVCOE",
                courses : [],
                password:"111",
                confirmPassword:"111"
            },
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    // router:router
}

export default authModule;
