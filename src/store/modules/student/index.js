import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
// import router from './router'

const studentModule = {
    namespaced: true,
    state() {
        return {
            student: null,
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
}

export default studentModule;
