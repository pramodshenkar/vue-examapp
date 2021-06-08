import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
// import router from './router'



const authModule = {
    namespaced: true,
    state() {
        return {
            courses : []
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
}

export default authModule;
