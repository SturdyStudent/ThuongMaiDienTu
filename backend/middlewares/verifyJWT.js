const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send({ auth: false });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("khách hàng không đăng nhập đã truy cập");
                res.json({ auth: false, messages: "Bạn không có quyền truy cập nội dung này" })
            } else {
                req.userId = decoded.id;
                console.log("truy cập thành công");
                next();
            }
        })
    }
}

module.exports = verifyJWT