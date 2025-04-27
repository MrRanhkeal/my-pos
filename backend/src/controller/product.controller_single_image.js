const { db, logErr, removeFile, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        //short
        var { txt_search, category_id, brand } = req.query;
        var sql = "SELECT" +
            " p.*, " +
            " c.name as category_name " +
            " FROM products p " +
            " INNER JOIN c on p.category_id = c.id " +
            " WHERE true ";
        if (txt_search) {
            sql += " AND (p.name LIKE : txt_search OR p.barcode = :barcode) ";
        }
        if (category_id) {
            sql += " AND p.category_id :category_id";
        }
        if (brand) {
            sql += " AND p.brand :brand"
        }

        const [list] = await db.query(sql, {
            txt_search: "%" + txt_search + "%",
            barcode: txt_search,
            category_id,
            brand
        });
        res.json({
            data: list,
            message: "succes",
            error: false
        })
    }
    catch (error) {
        logErr("product.getlist", error, res);
    }
};

exports.create = async (req, res) => {
    try {
        //req.body.barcode ?
        if (isExisBarcde(req.barcode)) {
            res.json({
                error: {
                    barcode: "Barcode already exists"
                },
            });
            return false;
        }
        res.json({
            body: req.body,
            message: "success",
            error: false
        })
        return;
        // var sql = "insert into products(category_id,barcode,name,brand,description,qty,price,discount,status,image,create_by) " +
        //     " values(:category_id,:barcode,:name,:brand,:description,:qty,:price,:discount,:status,:image,:create_by)";
        var sql =
            " INSERT INTO products (category_id, barcode,name,brand,description,qty,price,discount,status,image,create_by ) " +
            " VALUES (:category_id, :barcode, :name, :brand, :description, :qty, :price, :discount, :status, :image, :create_by ) ";
        var [data] = await db.query(sql, {
            ...req.body,
            image: req.file?.filename,
            create_by: req.auth?.name, //check this data
        });
        res.json({
            data: data,
            message: "success",
            error: false
        })
    }
    catch (error) {
        logErr("category.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        //short data
        var sql =
            " UPDATE products set " +
            " category_id = :category_id, " +
            " barcode = :barcode, " +
            " name = :name, " +
            " brand = :brand, " +
            " description = :description, " +
            " qty = :qty, " +
            " price = :price, " +
            " discount = :discount, " +
            " status = :status, " +
            " image = :image " +
            " WHERE id = :id";

        var filename = req.body.image;
        //new img
        if (req.file) {
            filename = req.file?.filename;
        }
        //change img
        if (
            req.body.image != "" &&
            req.body.image != null &&
            req.body.image != "null" &&
            req.file
        ) {
            removeFile(req.body.image);
            filename = req.file?.filename;
        }
        /// image remove
        if (req.body.image_remove == "1") {
            removeFile(req.body.image); // remove image
            filename = null;
        }

        //get all 
        var [data] = await db.query(sql, {
            ...req.body,
            image: filename,
            create_by: req.auth?.name
        })
        res.json({
            data: data,
            message: "success",
            error: false
        })
    }
    catch (error) {
        logErr("product.update", error, res);
    }
};
exports.remove = async (req, res) => {
    try {
        var [data] = await db.query("DELETE FROM products WHERE id = :id", {
            id: req.body.id, //null
        });
        if (data.affectedRows && req.body.image != "" && req.body.image != null) {
            removeFile(req.body.image);
        }
        res.json({
            data: data,
            message: "success",
            error: false
        })
    }
    catch (error) {
        logErr("product.create", error, res);
    }
};

isExisBarcde = async (barcode) => {
    try {
        var sql = "SELECT COUNT(id) as Total FROM products WHERE barcode =:barcode ";
        var [data] = await db.query(sql, {
            barcode: barcode,
        });
        if (data.length > 0 && data[0].Total > 0) {
            return true;  //is double data
        }
        return false; // none double
    }
    catch (err) {
        logErr("remove.create", err, res)
    }
};

exports.newBarcode = async (req, res) => {
    try {
        var sql =
            "SELECT " +
            "CONCAT('P',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM products), 3, '0')) " +
            "as barcode";
        var [data] = await db.query(sql);
        res.json({
            barcode: data[0].barcode,
            message: "success",
            error: false
        });
    }
    catch (err) {
        logErr("remove.create", err, res)
    }
};

