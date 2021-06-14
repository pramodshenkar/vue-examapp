export default {
    setReport(context,payload){
        context.report = payload.report;
    },
    clearReport(context) {
        context.report = {};
    }
}