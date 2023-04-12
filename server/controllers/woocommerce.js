import axios from "axios"
import { createWoocommerceLineItems } from "../helpers.js"

export const createWoocommerceOrder = async (cart, customerId) => {

    const line_items = createWoocommerceLineItems(cart);
    try {
        const { data } = await axios.post(
            `${process.env.WOO_URL}/wp-json/wc/v3/orders`,
            {
                status: 'pending',
                line_items: line_items,
                customer_id: customerId
            }
            ,
            {
                auth: {
                    username: process.env.WOO_CK,
                    password: process.env.WOO_CS,
                },
            }
        );
        return data;
    } catch (error) {
        return null;
    }
    //takes cart, converts it to line_items creates and returns a woocommerce order
}

const mergeCartItemsWithLineItems = (cart, lineItems) => {
    const mergedItems = [...lineItems];

    cart.forEach(cartItem => {
        const existingItem = mergedItems.find(item => item.product_id === cartItem.id);

        if (!existingItem) {
            const taxRate = 0.25;
            const price = cartItem.price / (1 + taxRate);
            const quantity = cartItem.quantity;
            const total = (price * quantity).toFixed(2);
            const totalTax = (total * taxRate).toFixed(2);

            const newItem = {
                product_id: cartItem.id,
                quantity: quantity,
                price: price,
                subtotal: total,
                subtotal_tax: totalTax,
                total: total,
                total_tax: totalTax

            };
            mergedItems.push(newItem);
        }
    });

    return mergedItems;
};

export const updateWooCommerceOrder = async (cart, orderId) => {
    const existingOrder = await getWoocommerceOrder(orderId);

    // Merge cart items with existing line items
    const mergedLineItems = mergeCartItemsWithLineItems(cart, existingOrder.line_items);

    const updatedLineItems = mergedLineItems.map(orderItem => {
        const cartItem = cart.find(cartItem => cartItem.id === orderItem.product_id);

        if (cartItem) {
            const taxRate = parseFloat((parseFloat(orderItem.total_tax) / parseFloat(orderItem.total)).toFixed(2));
            const price = orderItem.price;
            const total = (price * cartItem.quantity).toFixed(2);
            const totalTax = (total * taxRate).toFixed(2);
            return {
                id: orderItem.id,
                product_id: orderItem.product_id,
                quantity: cartItem.quantity,
                subtotal: total,
                subtotal_tax: totalTax,
                total: total,
                total_tax: totalTax
            }
        }
        return orderItem;
    });

    const orderTotalTax = updatedLineItems.reduce((sum, item) => sum + parseFloat(item.total_tax), 0);
    const orderTotal = updatedLineItems.reduce((sum, item) => sum + parseFloat(item.total), 0);

    const updatedOrderBody = {
        cartTax: orderTotalTax,
        total: orderTotal,
        total_tax: orderTotalTax,
        line_items: updatedLineItems
    }

    const { data: updatedOrder } = await axios.put(`${process.env.WOO_URL}/wp-json/wc/v3/orders/${orderId}`,
        updatedOrderBody, {
        auth: {
            username: process.env.WOO_CK,
            password: process.env.WOO_CS,
        },
    }
    );

    return updatedOrder;
};





export const setWoocommerceOrderProcessing = async (orderId, billing, shipping, klarnaOrderId) => {
    //takes orderId and a personalia object. sets the order to processing and updates billing and shipping information

    const body = {
        status: "processing",
        billing: {
            first_name: billing.given_name,
            last_name: billing.family_name,
            address_1: billing.street_address,
            city: billing.city,
            postcode: billing.postal_code,
            country: billing.country,
            email: billing.email,
            phone: billing.phone
        },
        shipping: {
            first_name: shipping.given_name,
            last_name: shipping.family_name,
            address_1: shipping.street_address,
            city: shipping.city,
            postcode: shipping.postal_code,
            country: shipping.country,
            email: shipping.email,
            phone: shipping.phone
        },
        transaction_id: klarnaOrderId,
        meta_data: [{ key: "_wc_klarna_order_id", value: klarnaOrderId }],
    }

    const { data: updatedOrder } = await axios.put(`${process.env.WOO_URL}/wp-json/wc/v3/orders/${orderId}`,
        body, {
        auth: {
            username: process.env.WOO_CK,
            password: process.env.WOO_CS,
        },
    }
    );
    return updatedOrder;

}

export const getWoocommerceOrder = async (orderId) => {
    //takes orderId and return woocommerce Order
    const { data } = await axios.get(
        `${process.env.WOO_URL}/wp-json/wc/v3/orders/${orderId}`,
        {
            auth: {
                username: process.env.WOO_CK,
                password: process.env.WOO_CS,
            },
        }
    );

    return data;
}


export const getProducts = async () => {
    const getProductsUrl = process.env.WOO_GET_PRODUCTS_URL;
    const auth = {
        auth: {
            username: process.env.WOO_CK,
            password: process.env.WOO_CS,
        },
    }
    const { data: response } = await axios.get(getProductsUrl, auth);
    const products = response.map(product => ({
        id: product.id,
        name: product.name,
        stock_quantity: product.stock_quantity,
        price: parseFloat(product.price),
        backorders_allowed: product.backorders_allowed,
        images: product.images.map(image => ({
            id: image.id,
            src: image.src,
        })),
        description: response.description,
        stock_status: response.stock_status

    }));
    return products;
}

export const getProduct = async (productId) => {
    const getProductsUrl = process.env.WOO_GET_PRODUCTS_URL + "/" + productId;
    const auth = {
        auth: {
            username: process.env.WOO_CK,
            password: process.env.WOO_CS,
        },
    }
    const { data: response } = await axios.get(getProductsUrl, auth);


    const product = {
        id: response.id,
        name: response.name,
        stock_quantity: response.stock_quantity,
        price: parseFloat(response.price),
        backorders_allowed: response.backorders_allowed,
        images: response.images.map(image => ({
            id: image.id,
            src: image.src,
        })),
        description: response.description,
        stock_status: response.stock_status

    };

    console.log("Getting them products")
    return product;
}