import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import CourseDashboard from './pages/CourseDashboard.vue'
import ExamScreen from './pages/ExamScreen.vue'

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
        path: '/dashboard/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }, 
    },
    {
        path: '/course/:courseid',
        name: 'CourseDashboard',
        component: CourseDashboard,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (from.name == 'Dashboard') {
                next()
            } else {
                next({ name: 'Dashboard', })
            }
        }
    },
    {
        path: '/exam/:examid',
        name: 'ExamScreen',
        component: ExamScreen,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            if (from.name == 'CourseDashboard') {
                next()
            } else {
                next({ name: 'CourseDashboard', })
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