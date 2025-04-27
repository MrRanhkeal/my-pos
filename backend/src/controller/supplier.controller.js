const { db, logErr } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM supplier");
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.getlist", error, res);
    }
}
exports.create = async (req, res) => {
    try {
        var sql =
            "INSERT INTO supplier (name,code,phone,email,address,description,create_by) VALUES (:name,:code,:phone,:email,:address,:description,:create_by) ";
        var [data] = await db.query(sql, {
            ...req.body,
            create_by: req.auth?.name,
        });
        res.json({
            data: data,
            message: "Insert success!",
        });
    }
    catch (error) {
        logErr("supplier.create", error, res);
    }
};
exports.update = async (req, res) => {
    try {
        var [list] = await db.query("UPDATE supplier SET ? WHERE id = ?", [req.body, req.params.id]);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.update", error, res);
    }
};
exports.remove = async (req, res) => {
    try {
        var [list] = await db.query("DELETE FROM supplier WHERE id = ?", req.params.id);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.remove", error, res);
    }
};



