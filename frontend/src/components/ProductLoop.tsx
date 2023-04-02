import { WooCommerceProductList } from "@/types";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductLoop({ products }: WooCommerceProductList) {
  return (
    <div className="grid grid-cols-4 gap-12 mx-[20vw] mt-[90px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
