import axios from "axios";

export const getUser = async (req, res) => {
    try {
        const { id } = req.user.data.user;
        const response = await axios.get(
            `https://vegard.demonstrer.es/wp-json/wc/v3/customers/${id}`,
            {
                auth: {
                    username: process.env.WOO_CK,
                    password: process.env.WOO_CS,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}