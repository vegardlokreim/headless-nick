import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import axios from "axios"

dotenv.config();
const app = express();


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, 'sO_F>%0{*!-2@d/[)nx2t_]G_P-?KROn:Ibc=x9wvq$>&03QO+mQ/[._ck82zz', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post('https://vegard.demonstrer.es/wp-json/jwt-auth/v1/token', {
            username,
            password
        });

        const token = response.data.token;
        const user = jwt.decode(token);

        res.cookie('token', token, { httpOnly: true });
        res.json({ id: token });

    } catch (error) {
        res.status(401).send('Invalid username or password');
    }
});

app.get('/auth-check', authenticateJWT, (_, res) => {
    res.sendStatus(200);
});
