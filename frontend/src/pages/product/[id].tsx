import { addToCart } from "@/state/slices/cartSlice";
import { WooCommerceProduct, WoocommerceCartItem, CartState } from "@/types";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Product({ product }: { product: WooCommerceProduct }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value);
    if (isNaN(quantity)) {
      //Not a number
      return;
    } else {
      setQuantity(quantity);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd: WoocommerceCartItem = {
      id: product.id,
      name: product.name,
      quantity: quantity,
      stock_quantity: product.stock_quantity,
      price: product.price,
      backorders_allowed: product.backorders_allowed,
      image: product.images[0].src,
    };

    dispatch(addToCart(itemToAdd));
  };
  return (
    <div className="mx-[20vw] mt-12">
      <div className="grid grid-cols-2 gap-10">
        <div className="">
          <img alt={product.name} src={product.images[0]?.src} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[28px]">{product.name}</h2>
          <div className="text-xl flex flex-row space-x-2">
            <p>{product.price} kr</p>
            <p>{product.stock_status === "instock" ? product.stock_quantity + " pcs in stock" : "Out of stock"}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <div className="flex flex-row space-x-2 mt-8 ">
            <input className="w-12 text-center outline-none border-2 p-2" onChange={handleQuantityInputChange} value={quantity} />
            <button onClick={handleAddToCart} className="bg-gray-200 py-2 px-4">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data: product } = await axios.get(`http://localhost:4000/products/${id}`);

  return {
    props: {
      product,
    },
  };
};
