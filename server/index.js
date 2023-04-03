import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


function authenticateJWT(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

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
}

app.get('/products', authenticateJWT, async (req, res) => {
    try {
        const response = await axios.get('https://your-wordpress-site.com/wp-json/wc/v3/products', {
            headers: {
                Authorization: `Bearer ${req.user.token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

