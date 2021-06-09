import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import NotFound from './pages/NotFound.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect:"/login" ,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
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