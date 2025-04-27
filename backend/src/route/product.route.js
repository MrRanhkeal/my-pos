const { getlist,create,update,remove,newBarcode,productImage } = require("../controller/product.controller");
const { logErr } = require("../util/logErr");
const { uploadFile } = require("../util/helper")
const { validate_token } = require("../middleware/jwt_token");
try {
    module.exports = (app) => {
        app.get("/api/product",validate_token(), getlist);
        app.post("/api/product", validate_token(), uploadFile.fields([
            { name: "upload_image", maxCount: 1 },
            { name: "upload_image_optional", maxCount: 4 }
        ]), create);
        app.put("/api/product",validate_token(),uploadFile.fields([
            { name: "upload_image", maxCount: 1 },
            { name: "upload_image_optional", maxCount: 4 }
        ]), update);
        app.delete("/api/product",validate_token(), remove);
        app.post("/api/new_barcode",validate_token(),newBarcode);
        app.get("/api/product_image/:prodcut_id",validate_token(),productImage);
    };
}
catch (err) {
    logErr("product.route", err);
}