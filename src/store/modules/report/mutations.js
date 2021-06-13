export default {
    // setCourses(context, payload) {
    //     context.courses = payload.courses;
    // },
    // clearCoursesData(context) {
    //     context.courses = [];
    // },
    
    // clearReportData(context) {
    //     context.report = [];
    // },
    setReport(context,payload){
        console.log("calling setReport mutation",payload)
        console.log(context.report)
        context.report = payload.report;
        console.log(context.report)
    }
}