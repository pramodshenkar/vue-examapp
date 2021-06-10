import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/store'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("Auth needed")

    console.log(store.state.student.student)
    if (store.state.student.student == null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    console.log("Auth not needed")
    console.log(store.state.student.student)

    next()
  }
})

new Vue({
  store: store,
  render: h => h(App),
  router: router
}).$mount('#app')
