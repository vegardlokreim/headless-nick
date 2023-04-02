import { getProduct, getProducts } from "./woocommerce.js"

export const getWoocommerceProducts = async (req, res) => {
    const products = await getProducts();
    res.send(products);
}

export const getWoocommerceProduct = async (req, res) => {
    const product = await getProduct(req.params.id);
    res.send(product);
}