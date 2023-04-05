import jwt from "jsonwebtoken"
export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.WOO_AUTH_SECRET, (err, decoded) => {
        if (err) {
            console.log("middleware/auth.js unauthorized request", err);
            return res.sendStatus(403);
        }
        req.user = decoded;
        req.token = token;
        next();
    });
};


export const attatchUserId = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    });
};