const {getlist,create,update,remove} = require("../controller/role.controller");
const { logErr } = require("../util/logErr");
const { validate_token } = require("../middleware/jwt_token");

try{
    module.exports = (app) => {
        app.get("/api/role", validate_token(), getlist);
        app.post("/api/role", validate_token(), create);
        app.put("/api/role", validate_token(), update);
        app.delete("/api/role", validate_token(), remove);
    }
}
catch(err){
    logErr("role.route", err);
}