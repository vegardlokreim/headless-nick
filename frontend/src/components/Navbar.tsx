import { setLoggedInState } from "@/state/slices/cartSlice";
import { RootState } from "@/state/store";
import { CartState, WoocommerceCartItem } from "@/types";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  totalQuantity: number;
};

export default function Navbar() {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state: RootState) => state.cart.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    const { data } = await axios.get("http://localhost:4000/auth/logout");
    dispatch(setLoggedInState(false));
    console.log(data);
  };

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
        {isLoggedIn && (
          <li className="cursor-pointer	" onClick={handleLogOut}>
            Log out
          </li>
        )}
      </ul>
    </nav>
  );
}
