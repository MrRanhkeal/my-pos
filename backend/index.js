const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// Basic route
app.get("/", (req, res) => {
    const list = [
        {
            id: 1,
            name: "ranh",
            gender: "male",
        },
    ];
    res.json({
        data: list,
        message: "success",
    });
});

// Dynamic route
const routesPath = path.join(__dirname, "src", "route");
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".route.js")) {
        const route = require(path.join(routesPath, file));
        route(app); // Call the route function with the app instance
    }
});

// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Internal server error" });
});

// 404 handler - must be after all routes
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.url} not found` });
});

// Start server
const port = 8081;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});