import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authModule from './modules/auth/index'
import courseModule from './modules/course/index'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: authModule,
        course:courseModule
    },
    plugins: [createPersistedState({
        key: 'keyname',
        storage: window.localStorage         
     })]
   })

export default store;
