import CartTable from "@/components/CartTable";
import HeroSection from "@/components/HeroSection";
import { createOrder, updateKlarnaOrder, updateOrder } from "@/requests";
import { clearCart, setKlarnaHtmlSnippet, setKlarnaOrderId, setWooCommerceOrderId } from "@/state/slices/cartSlice";
import { RootState } from "@/state/store";
import { KlarnaOrderResponse, WoocommerceCartItem } from "@/types";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export default function Cart({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.items);
  const klarnaOrderId = useSelector((state: RootState) => state.cart.klarnaOrderId);
  const wooOrderId = useSelector((state: RootState) => state.cart.wooOrderId);

  const handleCreateOrder = async () => {
    if (klarnaOrderId === "") {
      const { klarnaOrderId, klarnaHtmlSnippet, wooOrderId } = await createOrder(cart);

      dispatch(setKlarnaOrderId(klarnaOrderId));
      dispatch(setWooCommerceOrderId(wooOrderId));
      dispatch(setKlarnaHtmlSnippet(klarnaHtmlSnippet));
      router.push("/checkout");
    } else {
      const { klarnaHtmlSnippet }: KlarnaOrderResponse = await updateOrder(cart, klarnaOrderId, wooOrderId);
      console.log(klarnaHtmlSnippet);
      dispatch(setKlarnaHtmlSnippet(klarnaHtmlSnippet));
      router.push("/checkout");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="">
      <HeroSection title="Cart" description="Demo" />
      <CartTable />
      <div className="mt-4">
        <button className="px-4 py-2 bg-gray-200  shadow-md text-gray-700 hover:bg-gray-300 focus:outline-none" onClick={handleClearCart}>
          Clear cart
        </button>

        <button onClick={handleCreateOrder} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 ml-2">
          Checkout
        </button>
      </div>
    </div>
  );
}
