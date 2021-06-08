import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
// import router from './router'



const authModule = {
    namespaced: true,
    state() {
        return {
            
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    // router:router
}

export default authModule;
