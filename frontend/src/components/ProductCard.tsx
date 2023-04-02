import { addToCart } from "@/state/slices/cartSlice";
import { ProductCardProps, WoocommerceCartItem, WooCommerceProduct } from "@/types";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const itemToAdd: WoocommerceCartItem = {
      id: product.id,
      name: product.name,
      quantity: 1,
      stock_quantity: product.stock_quantity,
      price: product.price,
      backorders_allowed: product.backorders_allowed,
      image: product.images[0].src,
    };
    dispatch(addToCart(itemToAdd));
  };
  return (
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col items-center justify-center">
        <img src={product.images[0]?.src} />
        <h1 className="text-xl mt-4">{product.name}</h1>

        {product.stock_quantity > 0 ? (
          <button onClick={handleAddToCart} className="px-4 py-2 bg-gray-200 mt-4">
            Add to cart
          </button>
        ) : (
          <button className="px-4 py-2 bg-gray-200 mt-4">Out of stock</button>
        )}
      </div>
    </Link>
  );
}
