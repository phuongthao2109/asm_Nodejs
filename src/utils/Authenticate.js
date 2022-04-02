import User from "../models/User";
import { verifyToken } from "../utils/accesstoken";

export const isAuth = (req, res, next) => {
    const headerToken = req.headers["authorization"];
    const accessToken = headerToken && headerToken.split(" ")[1];

    if (headerToken === undefined) {
        return res.status(403).json({
            error: "Không được phép",
        });
    }

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET, (user, error) => {
        if (error)
            return res.status(401).json({
                error: "Không có quyền",
            });
        req.auth = user;
        next();
    });
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ _id: req.auth._id }).exec();
    if (user.role === 0) {
        return res.status(401).json({
            error: "Không có quyền",
        });
    }
    next();
};