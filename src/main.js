import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/store'

Vue.config.productionTip = false


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
