import axios from "axios";
import React, { useEffect, useState } from "react";
import { WoocommerceOrderResponse } from "@/types";
import OrderModal from "./OderModal";

const Orders = () => {
  const [orders, setOrders] = useState<WoocommerceOrderResponse[]>();
  const [selectedOrder, setSelectedOrder] = useState<WoocommerceOrderResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders }: { data: WoocommerceOrderResponse[] } = await axios.get("http://localhost:4000/orders/getWoocommerceOrdersByCustomerId", {
          withCredentials: true,
        });
        console.log(orders);
        setOrders(
          orders.map((order) => ({
            ...order,
            date_paid_gmt: order.date_paid_gmt
              ? new Date(order.date_paid_gmt).toLocaleString("nb-NO", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", "")
              : "not paid",
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order: WoocommerceOrderResponse) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Over the hills and far away fetching them orders, Sir...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 bg-gray-100 border">Order ID</th>
              <th className="px-4 py-2 bg-gray-100 border">Status</th>
              <th className="px-4 py-2 bg-gray-100 border">Paid</th>
              <th className="px-4 py-2 bg-gray-100 border">Order amount</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border">
                  <button className="underline cursor-pointer" onClick={() => handleOrderClick(order)}>
                    {order.id}
                  </button>
                </td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.date_paid_gmt}</td>
                <td className="px-4 py-2 border">
                  {order.total} {order.currency_symbol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedOrder && <OrderModal order={selectedOrder} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Orders;
