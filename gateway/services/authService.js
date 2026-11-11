const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || "8h";

const SSO_SECRET =
    process.env.SSO_SECRET ||
    JWT_SECRET;

const SSO_EXPIRES =
    process.env.SSO_EXPIRES ||
    "30s";

// ====================================
// Senhas
// ====================================

async function hashPassword(password) {

    return bcrypt.hash(
        password,
        SALT_ROUNDS
    );

}

async function comparePassword(password, hash) {

    return bcrypt.compare(
        password,
        hash
    );

}

// ====================================
// JWT do Portal
// ====================================

function generatePortalToken(user) {

    return jwt.sign(

        {

            id: user.id,

            username: user.username,

            role: user.role || "user"

        },

        JWT_SECRET,

        {
            expiresIn: JWT_EXPIRES
        }

    );

}

function verifyPortalToken(token) {

    return jwt.verify(
        token,
        JWT_SECRET
    );

}

module.exports = {

    hashPassword,
    comparePassword,

    generatePortalToken,
    verifyPortalToken

};