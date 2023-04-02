import axios from "axios";
import { KlarnaOrderResponse, WoocommerceCartItem } from "./types";


export const createOrder = async( cart: WoocommerceCartItem[]) => {
    const { data }: {data: KlarnaOrderResponse }= await axios.post("http://localhost:4000/orders/createOrder", cart);
    return data;
}
export const updateOrder = async( cart: WoocommerceCartItem[], klarnaOrderId: string, wooOrderId: number) => {
    
    const { data }: {data: KlarnaOrderResponse }= await axios.post("http://localhost:4000/orders/updateOrder", {cart, klarnaOrderId, wooOrderId});
    return data;
}

export const updateKlarnaOrder = async (cart : WoocommerceCartItem[], orderId: string, wooOrderId: number) => {
    const {data: response}: {data: KlarnaOrderResponse} = await axios.post(`http://localhost:4000/klarna/updateOrder/${orderId}`, {cart: cart, wooOrderId: wooOrderId});
    
    return response;

}