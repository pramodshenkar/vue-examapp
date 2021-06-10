export default {
    setCourses(context, payload) {
        context.courses = payload.courses;
    },
    clearCoursesData(context) {
        context.courses = [];
    },
}