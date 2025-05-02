
const { db, logErr, isEmpty, isArray } = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        //please select and sort data

        var [list] = await db.query("SELECT * FROM category ORDER BY id DESC");
        res.json({

            list: list,
            message: "success"
        })
    }
    catch (error) {
        //logErr(,error,res);
        logErr("category.getlist", error, res);
    }
};
exports.create = async (req, res) => {
    try {
        const {name,description,status,create_by,parent_id} = req.body;
        //var sql = "insert into category(name,description,status,create_by,parent_id) values(:name,:description,:status,:create_by,:parent_id)";
        var sql =`INSERT INTO category (
            name,
            description,
            status,
            create_by,
            parent_id
        ) VALUES (
            :name,
            :description,
            :status,
            create_by,
            :parent_id
        )`;
        var [list] = await db.query(sql,{
            name: req.body.name, //null
            description: req.body.description, //null
            status: req.body.status, //null
            // create_by: req.auth?.name,
            create_by: create_by || 'system', // Default to system if not specified
            parent_id: req.body.parent_id, //null
        });
        res.json({
            list,
            message: "success",
            error:false
        })
    }
    catch (error) {
        logErr("category.create", error, res);
        res.json({
            message: "failed to create category",
            error: true
        })
    }
};
exports.update = async (req, res) => {
    try {
        var sql = "update category set name=:name,description=:description,status=:status,parent_id=:parent_id where id=:id";
        var [list] = await db.query(sql, req.body);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("category.update", error, res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from category where id=:id";
        var [list] = await db.query(sql, req.body);
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("category.remove", error, res);
    }
};

