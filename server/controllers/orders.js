import axios from "axios";
import { createKlarnaOrder, updateKlarnaOrder, getKlarnaOrder as retrieveKlarnaOrder } from "./klarna.js";
import { createWoocommerceOrder, updateWooCommerceOrder } from "./woocommerce.js";

export const createOrder = async (req, res) => {
    //takes cart, returns klarnaOrderId, klarnaHtmlSnippet and woocommerceOrderId

    const cart = req.body;

    //Crete woocommerce order
    const woocommerceOrder = await createWoocommerceOrder(cart);

    //create klarna order
    const klarnaOrder = await createKlarnaOrder(woocommerceOrder);

    const response = { klarnaOrderId: klarnaOrder.order_id, klarnaHtmlSnippet: klarnaOrder.html_snippet, wooOrderId: woocommerceOrder.id };
    res.status(200).send(response);


    //Send back woocommerce order id, klarna order id and klarna htmlsnippet
}

export const getKlarnaOrder = async (req, res) => {
    const order_id = req.params.id;
    res.send(await retrieveKlarnaOrder(order_id))
}

export const getWoocommerceOrder = (req, res) => {
    //send back woocommerce order
}

export const updateOrder = async (req, res) => {
    // Recieve klarnaOrderId, woocommerceOrder id and updated cart
    const { cart, klarnaOrderId, wooOrderId } = req.body;

    // update woocommerceOrder
    const updatedWoocommerceOrder = await updateWooCommerceOrder(cart, wooOrderId);

    // update klarnaOrder
    const updatedKlarnaOrder = await updateKlarnaOrder(updatedWoocommerceOrder, klarnaOrderId);
    res.status(200).send({ klarnaHtmlSnippet: updatedKlarnaOrder.html_snippet });
    // Send back klarnaHtmlSnippet
}


