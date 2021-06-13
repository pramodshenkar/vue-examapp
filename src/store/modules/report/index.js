import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const reportModule = {
    namespaced: true,
    state() {
        return {
            report:{},
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
}

export default reportModule;
