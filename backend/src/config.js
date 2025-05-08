require('dotenv').config();

module.exports.config = {
    dbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
};
