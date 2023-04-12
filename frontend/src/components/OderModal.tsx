import { WoocommerceOrderResponse } from "@/types";
import Link from "next/link";

interface Props {
  order: WoocommerceOrderResponse;
  onClose: () => void;
}

const OrderModal = ({ order, onClose }: Props) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-lg">
          <div className="bg-white p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Order {order?.id} - status: {order?.status} {order.date_paid_gmt == undefined ? "not paid" : "- paid: " + order?.date_paid_gmt}
            </h3>

            <div className="mt-4">
              <table className="table-auto w-full mt-2 text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Item price</th>
                    <th className="px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.line_items.map((lineItem, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border px-4 py-2">
                        <Link href={`/product/${lineItem.product_id}`}>{lineItem.name}</Link>
                      </td>
                      <td className="border px-4 py-2">{lineItem.quantity} pcs</td>
                      <td className="border px-4 py-2">
                        {(parseFloat(lineItem.subtotal) + parseFloat(lineItem.subtotal_tax)) / lineItem.quantity} {order.currency_symbol}
                      </td>
                      <td className="border px-4 py-2">
                        {(parseFloat(lineItem.subtotal) + parseFloat(lineItem.subtotal_tax)) * lineItem.quantity} {order.currency_symbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td className="px-4 py-2" colSpan={2}></td>
                    <td className="px-4 py-2">Total:</td>
                    <td className="px-4 py-2">
                      {order?.total} {order.currency_symbol}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
