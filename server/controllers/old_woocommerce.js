import axios from "axios";
export const getProducts = async (req, res) => {
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

    res.send(products);
}

export const getProduct = async (req, res) => {

    const getProductsUrl = process.env.WOO_GET_PRODUCTS_URL + "/" + req.params.id;
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

    console.log(req.params.id);
    res.send(product);

}


export const createOrder = async (req, res) => {
    const line_items = createWoocommerceLineItems(req.body);
    try {
        const { data } = await axios.post(
            `${process.env.WOO_URL}/wp-json/wc/v3/orders`,
            {
                status: 'pending',
                line_items: line_items,
            }
            ,
            {
                auth: {
                    username: process.env.WOO_CK,
                    password: process.env.WOO_CS,
                },
            }
        );
        res.send(data);
    } catch (error) {
        console.error('Error creating pending order:', error.message);
        throw error;
    }


}

export const updateOrder = async (req, res) => {
    const line_items = createWoocommerceLineItems(req.body);

    const { data: existingOrder } = await axios.get(
        `${process.env.WOO_URL}/wp-json/wc/v3/orders/${orderId}`,
        {
            auth: {
                username: process.env.WOO_CK,
                password: process.env.WOO_CS,
            },
        }
    );

    // Update the line_items with the new information and add new items if needed
    const updatedLineItems = [];
    for (const newItem of line_items) {
        const existingItem = existingOrder.line_items.find(
            (item) => item.product_id === newItem.product_id
        );

        if (existingItem) {
            updatedLineItems.push({
                id: existingItem.id,
                product_id: newItem.product_id,
                quantity: newItem.quantity,
                subtotal: newItem.subtotal,
                total: newItem.total,
            });
        } else {
            updatedLineItems.push(newItem);
        }
    }

    //update the order in WooCommerce
    const { data } = await axios.put(
        `${process.env.WOO_URL}/wp-json/wc/v3/orders/${orderId}`,
        { line_items: updatedLineItems },
        {
            auth: {
                username: process.env.WOO_CK, // TODO: make this more secure
                password: process.env.WOO_CS,
            },
        }
    );

    console.log(data);
};


//transforms cart to woocommerce line items
const createWoocommerceLineItems = (cart) => {
    return cart.map((line) => {
        return {
            product_id: line.id,
            quantity: line.quantity,
        };
    });
};

