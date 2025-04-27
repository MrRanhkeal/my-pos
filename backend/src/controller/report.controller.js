
const { db, logErr, isArray, isEmpty } = require("../util/helper");


exports.report_sale_summary = async (req, res) => {
    try {
        let { from_date, to_date, category_id, brand_id } = req.query;
        let sql =
            " select  " +
            "  DATE_FORMAT(o.create_at,'%d/%m/%Y') title, " +
            "  sum(od.total_qty) total_qty, " +
            "    sum(od.total_amount)  total_amount " +
            " from orders o " +
            " inner join  " +
            " ( " +
            "    select  " +
            "      od1.order_id, " +
            "      sum(od1.qty) total_qty, " +
            "      sum(od1.total) total_amount " +
            "    from order_detail od1 " +
            "    inner join products p on od1.product_id = p.id " +
            "    where (:category_id IS NULL OR p.category_id = :category_id )  " +
            "    and (:brand_id IS NULL OR p.brand = :brand_id) " +
            "    group by od1.order_id " +
            " ) od on o.id = od.order_id " +
            " where  " +
            " DATE_FORMAT(o.create_at,'%Y-%m-%d') BETWEEN :from_date  and :to_date  " +
            " group by DATE_FORMAT(o.create_at,'%d/%m/%Y') ";
        const [list] = await db.query(sql, {
            from_date,
            to_date,
            category_id,
            brand_id,
        });
        res.json({
            data: list,
            message: "success",
            error: false
        })
    }
    catch (error) {
        logErr(error, "report.controller.js", "report_sale_summary");
    }
}