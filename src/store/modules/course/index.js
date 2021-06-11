import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const courseModule = {
    namespaced: true,
    state() {
        return {
            courses:[],
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
}

export default courseModule;
