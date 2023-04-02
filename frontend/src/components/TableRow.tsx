import { WoocommerceCartItem, WooCommerceProduct } from "@/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemQuantity } from "@/state/slices/cartSlice";
import { useRouter } from "next/router";

export const TableRow = ({ item }: { item: WoocommerceCartItem }) => {
  const router = useRouter();
  const [qty, setQty] = useState(item.quantity);

  const formatValue = (value: number): string => {
    const formattedAmount = value.toLocaleString("nb-NO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2, // use 2 decimal places if there are decimals, otherwise use 0
    });
    return formattedAmount;
  };

  const dispatch = useDispatch();

  const handleIncremetItem = () => {
    setQty((prevQty: number) => prevQty + 1);
  };
  const handleDecremtItem = () => {
    if (qty > 0) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  useEffect(() => {
    const updatedItem = { id: item.id, quantity: qty };

    dispatch(updateItemQuantity(updatedItem));
  }, [qty]);

  return (
    <tr key={item.id} className="border-b border-gray-400 hover:bg-gray-100">
      <td className="px-4 py-2">
        <img onClick={() => router.push(`/product/${item.id}`)} className="mx-auto" src={item.image} />
      </td>
      <td className="px-4 py-2">{item.name}</td>
      <td className="fle flex-row space-x-4 px-4 py-2">
        <button className="px-2" onClick={handleDecremtItem}>
          -
        </button>
        <input
          className="border-2 outline-none text-center w-10"
          value={qty}
          onChange={(event) => {
            const qty: number = Number(event.target.value);
            setQty(qty);
          }}
        />
        <button className="px-2" onClick={handleIncremetItem}>
          +
        </button>
      </td>
      <td className="px-4 py-2">{formatValue(item.price)} kr</td>
      <td className="px-4 py-2">{formatValue(item.price * item.quantity)} kr</td>
    </tr>
  );
};
