const { db, logErr, isArray, isEmpty } = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        const [category] = await db.query(
            "select id as value, name as label,description from category");
        const [role] = await db.query("select id, name, permissions from roles");
        const [supplier] = await db.query("select id, name ,code from supplier");
        //and more
        
        const brand = [
            { label: "arabia", value: "arabia", country: "th" },
            { label: "mondolkiri", value: "mondolkiri", country: "kh" },
            { label: "green-tea", value: "green-tea", country: "kh" },
            { label: "passion-fruit", value: "passion-fruit", country: "kh" },
            { label: "soda", value: "soda", country: "kh" },
            { label: "snack", value: "snack", country: "kh" },
            { label: "fresh-fruit", value: "fresh-fruit", country: "kh" },
        ];

        // const [customer] = await db.query(
        //     "select id as value, concat(name,'-',phone) as label, name, phone, email from customers"
        // );

        const [customer] = await db.query(
            "select id as value, concat(name) as label, name from customers"
        );
        const [expense_type] = await db.query("SELECT * FROM expense_type");

        res.json({
            category,
            role,
            supplier,
            brand,
            customer,
            expense_type,
        })
    }
    catch (error) {
        logErr("config.getlist", error, res);
    }
};

exports.getstocklist = async (req, res) => {
    try {
        const sqlSelect = 
            "SELECT " +
                "p.id, " +
                "p.name AS p_name, " +
                "p.qty AS p_qty, " +
                "p.brand AS p_brand, " +
                "c.name AS c_name, " +
                "p.image AS p_image, " +
                "p.create_by AS create_by, " +  // <-- Added comma here
                "CASE " +
                    "WHEN p.qty <= 2 THEN 'Low' " +
                    "ELSE 'High' " +
                "END AS stock_status " +
            "FROM products p " +
            "INNER JOIN category c ON p.category_id = c.id " +
            "WHERE p.status = 1";
        
        const [stock] = await db.query(sqlSelect);
        res.json({
            data: stock,
            message: "success"
        });
    } catch (error) {
        logErr("config.getstocklist", error, res);
    }

};
