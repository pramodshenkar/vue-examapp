// import axios from 'axios'
// import router from './../../../routes'

export default {
  setStudent(context, payload) {
       context.student = payload.student
  },
  clearStudent(context) {
    context.student = null
},
}