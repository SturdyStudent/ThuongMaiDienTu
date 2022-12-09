const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send({ auth: false });
    } else {
        console.log("có token", typeof(token));
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, messages: "Bạn không có quyền truy cập nội dung này" })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = verifyJWT