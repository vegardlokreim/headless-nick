import { RootState } from "@/state/store";
import { WoocommerceCartItem } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

import { TableRow } from "./TableRow";

export default function CartTable() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const formatValue = (value: number): string => {
    const formattedAmount = value.toLocaleString("nb-NO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2, // use 2 decimal places if there are decimals, otherwise use 0
    });
    return formattedAmount;
  };

  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  return (
    <div className="">
      <table className="table-auto border-collapse w-full text-center">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="w-64 px-4 py-2"></th>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>{cart.length > 0 && cart.map((item: WoocommerceCartItem) => <TableRow key={item.id} item={item} />)}</tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="px-4 py-2" colSpan={2}></td>
            <td className="px-4 py-2">{formatValue(totalQuantity)} items</td>
            <td className="px-4 py-2">Total:</td>
            <td className="px-4 py-2">{formatValue(totalAmount)} kr</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
