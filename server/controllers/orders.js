import axios from "axios";
import { createKlarnaOrder, updateKlarnaOrder, retrieveKlarnaOrder } from "./klarna.js";
import { createWoocommerceOrder, updateWooCommerceOrder } from "./woocommerce.js";
import jwt from "jsonwebtoken"

export const createOrder = async (req, res) => {

    const { user } = req.user
    console.log(user);

    const cart = req.body;
    const woocommerceOrder = await createWoocommerceOrder(cart);
    const klarnaOrder = await createKlarnaOrder(woocommerceOrder);
    const response = { klarnaOrderId: klarnaOrder.order_id, klarnaHtmlSnippet: klarnaOrder.html_snippet, wooOrderId: woocommerceOrder.id };
    res.status(200).send(response);
}

export const getKlarnaOrder = async (req, res) => {
    const order_id = req.params.id;
    res.send(await retrieveKlarnaOrder(order_id))
}

export const getWoocommerceOrder = (req, res) => {

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
    console.log(updatedKlarnaOrder)
    res.status(200).send({ klarnaHtmlSnippet: updatedKlarnaOrder.html_snippet });

}


