export default {
    setCourses(context, payload) {
        context.courses = payload.courses;
    },
    clearCoursesData(context) {
        context.courses = [];
    },
    
    // clearReportData(context) {
    //     context.report = [];
    // },
    // setReport(context,payload){
    //     console.log("calling hello action",payload.report)
    //     console.log(context.report)
    //     context.report = payload.report;
    //     console.log(context.report)
    // }
}