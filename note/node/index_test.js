exports.validate_token = () => {
    return (req, res, next) => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.status(401).json({
                    message: "Unauthorized",
                    error: "No token provided"
                });
            }

            const parts = authorization.split(" ");
            if (parts.length !== 2 || parts[0] !== "Bearer") {
                return res.status(401).json({
                    message: "Unauthorized",
                    error: "Invalid token format"
                });
            }

            const token = parts[1];

            jwt.verify(token, config.config.token.access_token_key, (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        message: "Unauthorized",
                        error: "Invalid token",
                        success: false
                    });
                }
                
                // decoded.data = { id, name, role_id } based on your getAccessToken
                req.current_id = decoded.data.profile.id;
                req.auth = decoded.data.profile; // Full user data (id, name, role_id)
                req.permission = decoded.data.permision;

                next(); // Go to controller
            });
        } catch (error) {
            console.error("validate_token error:", error);
            return res.status(401).json({
                message: "Unauthorized",
                error: "Token validation failed"
            });
        }
    };
};

exports.getAccessToken = async (user) => {
    const payload = {
        data: {
            id: user.id,
            name: user.name,
            role_id: user.role_id,
        }
    };

    const access_token = await jwt.sign(
        payload,
        config.config.token.access_token_key,
        { expiresIn: "12h" }
    );

    return access_token;
}


//for register
try {
    const { role_id, name, username, password } = req.body;
    if (!role_id || !name || !username || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    var sql = "INSERT INTO users (role_id,name,username,password,create_by) values " +
        "(:role_id,:name,:username,:password,:create_by)"; //is params

    const data = await db.query(sql, {
        role_id,
        name,
        username,
        password: hashedPassword,
        create_by: req.body.create_by || "system", // fallback if no auth

    });

    res.json({
        data,
        message: "User registered successfully"
    });
} catch (error) {
    logErr("auth.register", error, res);
    res.status(500).json({ message: "Internal Server Error" });
}