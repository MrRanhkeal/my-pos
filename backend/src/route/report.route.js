const { validate_token } = require("../middleware/jwt_token");
const report = require("../controller/report.controller");
const { logErr } =  require("../util/logErr");
try{
    module.exports = (app) => {
        app.get(
            "/api/report_sale_summary",
            validate_token(),
            report.report_sale_summary
        );
        app.get("/api/report_top_sale", validate_token(), report.report_top_sale);
    };
}
catch (error) {
    logErr(error, "report.route.js");
}
