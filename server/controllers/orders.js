import axios from "axios";
import { createKlarnaOrder, updateKlarnaOrder, retrieveKlarnaOrder } from "./klarna.js";
import { createWoocommerceOrder, updateWooCommerceOrder } from "./woocommerce.js";

export const createOrder = async (req, res) => {
    const id = req.user ? req.user.data.user.id : 0;

    const cart = req.body;
    const woocommerceOrder = await createWoocommerceOrder(cart, id);
    const klarnaOrder = await createKlarnaOrder(woocommerceOrder);
    const response = { klarnaOrderId: klarnaOrder.order_id, klarnaHtmlSnippet: klarnaOrder.html_snippet, wooOrderId: woocommerceOrder.id };
    res.status(200).send(response);
}

export const getKlarnaOrder = async (req, res) => {
    const order_id = req.params.id;
    res.send(await retrieveKlarnaOrder(order_id))
}

export const getWoocommerceOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await axios.get(
            `https://vegard.demonstrer.es/wp-json/wc/v3/orders/${orderId}`,
            {
                auth: {
                    username: process.env.WOO_CK,
                    password: process.env.WOO_CS,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ikke auth');
    }
}

export const getWoocommerceOrdersByCustomerId = async (req, res) => {
    try {
        const { id } = req.user.data.user;
        const response = await axios.get(
            `https://vegard.demonstrer.es/wp-json/wc/v3/orders?customer=${id}`,
            {
                auth: {
                    username: process.env.WOO_CK,
                    password: process.env.WOO_CS,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ikke auth');
    }
}

export const updateOrder = async (req, res) => {

    const { cart, klarnaOrderId, wooOrderId } = req.body;
    const updatedWoocommerceOrder = await updateWooCommerceOrder(cart, wooOrderId);
    const updatedKlarnaOrder = await updateKlarnaOrder(updatedWoocommerceOrder, klarnaOrderId);
    res.status(200).send({ klarnaHtmlSnippet: updatedKlarnaOrder.html_snippet });

}


