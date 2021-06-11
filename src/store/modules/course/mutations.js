export default {
    setCourses(context, payload) {
        context.courses = payload.courses;
    },
    clearCoursesData(context) {
        context.courses = [];
    },
    // setReport(context, payload) {
    //     console.log("call setReport in Mutaton")
    //     context.report = payload.report;
    // },
    clearReportData(context) {
        context.report = [];
    },
    setReport(context,payload){
        console.log("calling hello action",payload.report)
        console.log(context.report)
        context.report = payload.report;
        console.log(context.report)

    }
}