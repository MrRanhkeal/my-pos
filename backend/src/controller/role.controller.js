const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM roles");
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("role.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        var sql = "insert into roles(name,permissions,status) values(:name,:permissions,:status)";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("role.create",error,res);
    }
};
exports.update = async (req, res) => {
    try {
        var sql = "update roles set name=:name,permissions=:permissions,status=:status where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("role.update",error,res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from roles where id=:id";
        var [list] = await db.query(sql,req.body);
        res.json({
            data:list,
            message:"success"
        })
    } 
    catch (error) {
        logErr("role.remove",error,res);
    }
};
