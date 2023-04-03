import axios from "axios";

export const createKlarnaOrderLines = (cart) => {
    let order_lines = [];
    cart.forEach((line) => {

        const unit_price = Math.round(line.price + (line.total_tax / line.quantity));
        const total_amount = unit_price * line.quantity;
        const tax_rate = Math.round(line.subtotal_tax * 100 / line.subtotal) * 100;
        const total_tax_amount = calculateTaxAmount(total_amount, tax_rate);

        order_lines.push({
            type: "physical",
            reference: line.product_id,
            name: line.name,
            quantity: line.quantity,
            unit_price: unit_price * 100,
            tax_rate: Math.round(line.subtotal_tax * 100 / line.subtotal) * 100,
            total_amount: total_amount * 100,
            total_discount_amount: 0,
            total_tax_amount: total_tax_amount * 100
        });
    });
    return order_lines;
};

const calculateTaxAmount = (amount, taxRate) => {
    return amount - (amount * 10000) / (10000 + taxRate);
}


//transforms cart to woocommerce line items
export const createWoocommerceLineItems = (cart) => {

    return cart.map((line) => {
        return {
            product_id: line.id,
            quantity: line.quantity,

        };
    });
};
