const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const { logErr } = require("./src/util/logErr");
//middleware
app.use(express.json()); //new
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
//cors is cross origin resource sharing for protexted webrowser to prevent unauthorized access
app.get("/", (req, res) => {
    const list = [
        {
            id: 1,
            name: "ranh",
            gender: "male"
        }
    ];
    res.json({
        data: list,
        message: "success"
    });
});

//basic route
// try{
//     require("./src/route/auth.route")(app);
//     require("./src/route/category.route")(app);
//     require("./src/route/config.route")(app);
//     require("./src/route/customer.route")(app);
//     require("./src/route/invoice.route")(app);
//     require("./src/route/order_items.route")(app);
//     require("./src/route/order.rotue")(app);
//     require("./src/route/product.route")(app);
//     require("./src/route/role.route")(app);
// }
// catch(err){
//     //console.log(err);
// }

//dynamic route
try {
    const routesPath = path.join(__dirname, "src", "route");
    fs.readdirSync(routesPath).forEach((file) => {
        if (file.endsWith(".route.js")) {
            require(path.join(routesPath, file))(app);
        }
    });
} catch (err) {
    logErr("index.js",err);
}

// Error-handling middleware
app.use((err, req, res, next) => {
    logErr("index.js", err);
    res.status(500).json({ error: "Internal server error" });
});

// 404 handler - must be after all routes
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.url} not found` });
});

//start server
const port = 8081;
app.listen(port, () => {
    console.log('http://localhost:' + port);
});