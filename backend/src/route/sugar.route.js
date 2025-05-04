const {getlist,create,update,remove} = require("../controller/sugar.controller");

module.exports = (app) => {
    app.get("/api/sugar", getlist);
    app.post("/api/sugar",create);
    app.put("/api/sugar", update);
    app.delete("/api/sugar", remove);
};
