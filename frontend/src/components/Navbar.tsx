import { RootState } from "@/state/store";
import { CartState, WoocommerceCartItem } from "@/types";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  return (
    <nav className="flex bg-black text-white justify-between items-center p-8 text-xl">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}
