const { getlist, create, update, remove, newBarcode } = require("../controller/product.controller_single_image");
const { logErr } = require("../util/logErr");
const { uploadFile } = require("../util/helper")
const { validate_token } = require("../middleware/jwt_token");
try {
    module.exports = (app) => {
        app.get("/api/product",validate_token(), getlist);
        app.post("/api/product", validate_token(),uploadFile.single("upload_image"),create);
        app.post("/api/new_barcode",validate_token(),newBarcode);
        app.put("/api/product",validate_token(),uploadFile.single("upload_image"), update);
        app.delete("/api/product",validate_token(), remove);
    };
}
catch (err) {
    logErr("product.route", err);
}