import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const courseModule = {
    namespaced: true,
    state() {
        return {
            courses:[
                {
                   "courseid":"1",
                   "coursename":"AAA"
                },
                {
                   "courseid":"2",
                   "coursename":"BB"
                },
                {
                   "courseid":"f7f5ed36-6bbc-4ad6-bbed-850c5775321e",
                   "coursename":"CC"
                },
                {
                   "courseid":"fbef57af-2637-4ada-8a0e-a352cc9d555b",
                   "coursename":"DD"
                }
             ],
        }   
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
}

export default courseModule;
