import { createKlarnaOrderLines } from "../helpers.js";
import axios from "axios";
import { setWoocommerceOrderProcessing } from "./woocommerce.js";

export const createKlarnaOrder = async (woocommerceOrder) => {
    //takes woocommerceOrder, transforms it into order_lines, creates klarna order and returns html_snippet and klarna order id
    const order_lines = createKlarnaOrderLines(woocommerceOrder.line_items);
    const total_tax_amount = order_lines.reduce((sum, line) => {
        return sum + line.total_tax_amount;
    }, 0);
    const order_amount = order_lines.reduce((sum, line) => {
        return sum + line.total_amount;
    }, 0);

    const { data: klarnaOrder } = await axios.post(process.env.KLARNA_CREATE_ORDER_URL,
        {
            purchase_country: "NO",
            purchase_currency: "NOK",
            locale: "nb-NO",
            order_amount: order_amount,
            order_tax_amount: total_tax_amount,
            order_lines: order_lines,
            merchant_reference1: woocommerceOrder.id,
            merchant_urls: {
                terms: "https://www.example.com/terms.html", //TODO: Get these links from .env
                checkout: "http://localhost:3000/checkout", //TODO: Get these links from .env
                confirmation: "http://localhost:3000/confirmation/?orderId={checkout.order.id}", //TODO: Get these links from .env

                push: "https://www.example.com/api/push", //TODO: Get these links from .env
            },
        }
        ,
        {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.KLARNA_USERNAME + ":" + process.env.KLARNA_PASSWORD
                    ).toString("base64"),
                "Content-Type": "application/json",
            },
        }
    );
    return klarnaOrder;
}

export const retrieveKlarnaOrder = async (orderId) => {

    const { data } = await axios.get(
        `${process.env.KLARNA_CREATE_ORDER_URL}/${orderId}`, {
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.KLARNA_USERNAME + ":" + process.env.KLARNA_PASSWORD).toString("base64"),
            "Content-Type": "application/json",
        }
    },
    );

    const { status, billing_address, shipping_address, html_snippet: klarnaHtmlSnippet, merchant_reference1: wooOrderId } = data;


    if (status === "checkout_complete") {
        const updatedWooOrder = await setWoocommerceOrderProcessing(wooOrderId, billing_address, billing_address, orderId);
        console.log("🚀 ~ file: klarna.js:63 ~ retrieveKlarnaOrder ~ updatedWooOrder:", updatedWooOrder)


    }

    return { status, klarnaHtmlSnippet };
}

export const updateKlarnaOrder = async (woocommerceOrder, orderId) => {
    //takes order id, woocommerceOrder, transforms it into order_lines, and updates klarna order with same id and returns html snippet
    const order_lines = createKlarnaOrderLines(woocommerceOrder.line_items);

    const total_tax_amount = order_lines.reduce((sum, line) => {
        return sum + line.total_tax_amount;
    }, 0);
    const order_amount = order_lines.reduce((sum, line) => {
        return sum + line.total_amount;
    }, 0);

    const { data } = await axios.post(
        `${process.env.KLARNA_CREATE_ORDER_URL}/${orderId}`, {
        purchase_country: "NO",
        purchase_currency: "NOK",
        locale: "nb-NO",
        order_amount: order_amount,
        order_tax_amount: total_tax_amount,
        order_lines: order_lines,
        merchant_reference1: woocommerceOrder.id,
        merchant_urls: {
            terms: "https://www.example.com/terms.html",
            checkout: "http://localhost:3000/checkout",
            confirmation: "http://localhost:3000/confirmation/?orderId={checkout.order.id}",
            push: "https://www.example.com/api/push",
        }
    }, {
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.KLARNA_USERNAME + ":" + process.env.KLARNA_PASSWORD).toString("base64"),
            "Content-Type": "application/json",
        }
    },

    );
    return data;
}