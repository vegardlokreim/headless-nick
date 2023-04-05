import axios from "axios";
import jwt from "jsonwebtoken"


export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}


export const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const response = await axios.post('https://vegard.demonstrer.es/wp-json/jwt-auth/v1/token', {
            username,
            password
        });

        const token = response.data.token;
        const user = jwt.decode(token);
        res.cookie('token', token, { httpOnly: true });
        res.json({ id: user.data.user.id, username: user.data.user.user_login });


    } catch (error) {
        res.status(401).send('Wrong crendentials');
    }
}

export const authCheck = (_, res) => {
    res.sendStatus(200);
}


