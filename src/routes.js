import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import ExamDashboard from './pages/ExamDashboard.vue'
import NotFound from './pages/NotFound.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: "/login",
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.state.student.student != null) {
                next({ name: 'Dashboard', })
            } else {
                next()
            }
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/examdashboard',
        name: 'ExamDashboard',
        component: ExamDashboard,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            console.log(from.name)
            if (from.name == 'Dashboard') {
                next()
            } else {
                next({ name: 'Dashboard', })
            }
        }
    },
    {
        path: '/:NotFound(.*)*',
        component: NotFound
    }
];


const router = new VueRouter({
    routes: routes,
    mode: "history"
})

export default router