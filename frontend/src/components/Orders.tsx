import axios from "axios";
import React from "react";
import { GetServerSideProps } from "next";
import { WoocommerceOrderResponse } from "@/types";

const Orders = ({ orders }: { orders: WoocommerceOrderResponse[] }) => {
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order: WoocommerceOrderResponse) => (
          <li key={order.id}>
            {order.id} {order.status} {order.date_paid_gmt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data: orders }: { data: WoocommerceOrderResponse[] } = await axios.get("http://localhost:4000/orders", {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie || "", // Pass the cookies from the client-side to the server-side request
      },
    });

    return { props: { orders } };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page if the user is not authenticated
      context.res.setHeader("Location", "/login");
      context.res.statusCode = 302;
      context.res.end();
    } else {
      console.error("Error fetching orders:", error.message);
    }

    return { props: { orders: [] } }; // Return an empty array for orders in case of an error
  }
};
