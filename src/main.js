import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/store'

Vue.config.productionTip = false

export const BASEURL = 'http://127.0.0.1:8887'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.student.student == null) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
