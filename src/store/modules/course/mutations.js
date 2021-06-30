export default {
    setCourses(context, payload) {
        context.courses = payload.courses;
    },
    setCurrentCourse(context, payload) {
        console.log("setting currentCourse")
        console.log(context,payload)
        context.currentCourse = payload.currentCourse;
    },
    clearCourses(context) {
        context.courses = [];
    },
    clearcurrentCourse(context) {
        context.currentCourse = {}
    },   
}