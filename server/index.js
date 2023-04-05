import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import axios from "axios"
import { authenticateJWT } from "./middleware/auth.js";

import authRouter from "./routes/auth.js";

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


app.use("/auth", authRouter);


app.get('/orders', authenticateJWT, async (req, res) => {
    const { user } = req;

    try {
        const response = await axios.get(
            `https://vegard.demonstrer.es/wp-json/wc/v3/orders?customer=${user.data.user.id}`,
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            }
        );

        res.json(response.data);
    } catch (error) {

        res.status(500).send('Ikke auth');
    }
});

