import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import studentModule from './modules/student/index'
import courseModule from './modules/course/index'
import reportModule from './modules/report/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        student: studentModule,
        course:courseModule,
        report:reportModule
    },
    plugins: [createPersistedState()],

   })

export default store;
