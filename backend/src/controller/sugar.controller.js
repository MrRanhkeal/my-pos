const { db, logErr } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        const sql = "SELECT * FROM sugar ORDER BY value";
        const [list] = await db.query(sql);
        res.json({
            list: list,
            message: "success"
        });
    } catch (error) {
        logErr("sugar.getlist", error, res);
    }
};

exports.create = async (req, res) => {
    try {
        const sql = "INSERT INTO sugar (value) VALUES (:value)";
        const [data] = await db.query(sql, req.body);
        res.json({
            data: data,
            message: "Insert success!"
        });
    } catch (error) {
        logErr("sugar.create", error, res);
    }
};

exports.update = async (req, res) => {
    try {
        const sql = "UPDATE sugar SET value=:value WHERE id=:id";
        const [data] = await db.query(sql, req.body);
        res.json({
            data: data,
            message: "Update success!"
        });
    } catch (error) {
        logErr("sugar.update", error, res);
    }
};

exports.remove = async (req, res) => {
    try {
        const [data] = await db.query("DELETE FROM sugar WHERE id = :id", req.body);
        res.json({
            data: data,
            message: "Delete success!"
        });
    } catch (error) {
        logErr("sugar.remove", error, res);
    }
};
