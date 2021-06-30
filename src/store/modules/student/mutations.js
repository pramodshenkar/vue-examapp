
export default {
  setStudent(context, payload) {
    console.log("SetStudent called")
    console.log(context,payload)
    context.student = payload.student
  },
  clearStudent(context) {
    context.student = null
  },
  setToken(context, payload) {
    context.token = payload.token
  },
  clearToken(context) {
    context.token = ""
  },
}