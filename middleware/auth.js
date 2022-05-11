const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try{ 
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (error, payload) => {
        if (error) {
            response.status(401).json("Unauthorized!")
        } else {
            request.payload = payload;
            next();
        }
    });
    } catch (error) {
        response.status(500).json(error.message);
    }
};