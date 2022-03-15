import jwt from "jsonwebtoken";

export const generateToken = (user, options) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, options);
};

export const verifyToken = (token, resolve) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        resolve(user, error);
    });
};