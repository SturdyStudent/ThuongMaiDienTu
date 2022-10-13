var { expressjwt: jwt } = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
    secret: "asdfhasd;f",
    algorithms: ["HS256"]
});


module.exports = authenticate;