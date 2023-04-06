import { RootState } from "@/state/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  totalQuantity: number;
};

export default function Navbar() {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state: RootState) => state.cart.isLoggedIn);

  console.log();
  return (
    <nav className="flex bg-black text-white justify-between items-center p-8 text-xl">
      <div>Logo</div>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>

        <li>
          <Link href="/cart">Cart ({totalQuantity})</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link href="/myAccount">My account</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
