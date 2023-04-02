import axios from "axios";
import { createKlarnaOrder, createKlarnaOrderLines, updateKlarnaOrder } from "../helpers.js";

export const createOrder = async (req, res) => {
    const url = `${req.protocol}://${req.hostname}:${req.socket.localPort}/woocommerce/orders`;
    const { data: woocommerceOrder } = await axios.post(url, req.body);


    const order_lines = createKlarnaOrderLines(woocommerceOrder.line_items);

    const klarnaOrder = await createKlarnaOrder(order_lines, woocommerceOrder.id)

    const { order_id, html_snippet } = klarnaOrder;

    res.status(201).json({
        klarnaOrderId: order_id,
        wooOrderId: woocommerceOrder.id,
        klarnaHtmlSnippet: html_snippet,
    });
};


export const updateOrder = async (req, res) => {
    const { id: klarna_order_id } = req.params;
    const { cart, wooOrderId } = req.body;

    const order_lines = createKlarnaOrderLines(cart);

    const klarnaOrder = await updateKlarnaOrder(order_lines, klarna_order_id, wooOrderId);

    const woocommerceOrder = await updateWoocommerceOrder();
    const updatedWooOrder = `${req.protocol}://${req.hostname}:${req.socket.localPort}/woocommerce/updateOrder/${wooOrderId}`;


    const { order_id, html_snippet } = order;

    updateWoocommerceOrder(wooOrderId, order_lines);

    // const response = { orderId: order_id, htmlSnippet: html_snippet };
    // res.send(response);
}