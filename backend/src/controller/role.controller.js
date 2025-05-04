const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM roles");
        // Ensure permissions are valid JSON
        list = list.map(role => ({
            ...role,
            permissions: role.permissions || '[]'
        }));
        res.json({
            data: list,
            message: "success"
        })
    } 
    catch (error) {
        logErr("role.getlist",error,res);
    }
};
exports.create = async (req, res) => {
    try {
        // Validate permissions is valid JSON array
        let permissions = req.body.permissions;
        try {
            JSON.parse(permissions);
        } catch {
            permissions = '[]';
        }

        var sql = "insert into roles(name,permissions) values(:name,:permissions)";
        var [list] = await db.query(sql, {
            ...req.body,
            permissions
        });

        // Get the created role
        var [newRole] = await db.query("SELECT * FROM roles WHERE id = ?", [list.insertId]);
        res.json({
            data: newRole[0],
            message: "success"
        })
    } 
    catch (error) {
        logErr("role.create",error,res);
    }
};
exports.update = async (req, res) => {
    try {
        // Validate permissions is valid JSON array
        let permissions = req.body.permissions;
        try {
            JSON.parse(permissions);
        } catch {
            permissions = '[]';
        }

        var sql = "update roles set name=:name,permissions=:permissions where id=:id";
        var [result] = await db.query(sql, {
            ...req.body,
            permissions
        });

        // Get the updated role
        var [updatedRole] = await db.query("SELECT * FROM roles WHERE id = ?", [req.body.id]);
        res.json({
            data: updatedRole[0],
            message: "success"
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
