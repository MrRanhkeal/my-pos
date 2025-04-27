const { validate_token } = require("../middleware/jwt_token");
const {
    getListExpanseType, getList, create, update, remove,} = require("../controller/expense.controller");
module.exports = (app) => {
    app.get("/api/expanse_type", validate_token(), getListExpanseType);
    app.get("/api/expanse", validate_token(), getList);
    app.post("/api/expanse", validate_token(), create);
    app.put("/api/expanse", validate_token(), update);
    app.delete("/api/expanse", validate_token(), remove);
};
