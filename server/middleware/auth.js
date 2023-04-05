import jwt from "jsonwebtoken"
export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, "sO_F>%0{*!-2@d/[)nx2t_]G_P-?KROn:Ibc=x9wvq$>&03QO+mQ/[._ck82zz", (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded;
        req.token = token;
        next();
    });
};