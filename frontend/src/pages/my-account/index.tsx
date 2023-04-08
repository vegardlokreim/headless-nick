import Orders from "@/components/Orders";
import { setLoggedInState } from "@/state/slices/cartSlice";
import { RootState } from "@/state/store";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyAccount: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.cart.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    const { data } = await axios.get("http://localhost:4000/auth/logout");
    dispatch(setLoggedInState(false));
    Router.push("/");
  };
  const [activeTab, setActiveTab] = useState("mypage");

  const renderContent = () => {
    switch (activeTab) {
      case "mypage":
        return <div>My page content goes here...</div>;
      case "orders":
        return <Orders />;
      case "wishlist":
        return <div>Wishlist content goes here...</div>;
      default:
        return <div>Select an option from the left menu.</div>;
    }
  };

  return (
    <div className="flex flex-col items-center h-[93vh] mx-[20vw] mt-20">
      <h1 className="text-3xl">My account</h1>

      {/* Main content */}
      <div className="flex flex-row w-full">
        {/* Left side */}
        <div className="p-4 w-1/5">
          <ul className=" flex flex-col gap-4 text-xl">
            <li onClick={() => setActiveTab("mypage")} className="cursor-pointer">
              My page
            </li>
            <li onClick={() => setActiveTab("orders")} className="cursor-pointer">
              Orders
            </li>
            <li onClick={() => setActiveTab("wishlist")} className="cursor-pointer">
              Wishlist
            </li>
            <li onClick={handleLogOut} className="cursor-pointer">
              Log out
            </li>
          </ul>
        </div>
        {/* right side */}
        <div className="flex flex-1 p-4 min-w-0 justify-start items-start">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MyAccount;
