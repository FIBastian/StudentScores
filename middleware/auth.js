const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const bearerToken = req.header("Authorization");
    try {
        const token = bearerToken.replace("Bearer ", "");
        const decoded = jwt.verify(token, "passwordKita");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "Failed",
            message: "Unauthorized, invalid token"
        });
    }
};