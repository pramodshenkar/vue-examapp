import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import studentModule from './modules/student/index'
import courseModule from './modules/course/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        student: studentModule,
        course:courseModule,
    },
    plugins: [createPersistedState()],

   })

export default store;
