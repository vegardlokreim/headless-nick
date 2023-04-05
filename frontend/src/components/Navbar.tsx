import { RootState } from "@/state/store";
import { CartState, WoocommerceCartItem } from "@/types";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const router = useRouter();
  const handleLogOut = async () => {
    const response = await axios.get("http://localhost:4000/auth/logout", { withCredentials: true });
    console.log(response.statusText);
    if (response.statusText === "OK") {
      router.push("/login");
    }
  };

  return (
    <nav className="flex bg-black text-white justify-between items-center p-8 text-xl">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Log in</Link>
        </li>
        <li>
          <div onClick={handleLogOut}>Log out</div>
        </li>
      </ul>
    </nav>
  );
}
