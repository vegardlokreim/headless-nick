import { WoocommerceOrderResponse } from "@/types";

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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order {order.id}</h3>
                <div className="mt-2">
                  <div className="mb-2">
                    <span className="font-bold">Order status:</span> {order?.status}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Total:</span> {order?.total} {order.currency_symbol}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Date paid:</span> {order.date_paid_gmt == undefined ? "not paid" : order.date_paid_gmt}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Line items:</span>{" "}
                    {order.line_items.map((lineItem) => (
                      <h1>
                        {lineItem.name} - {lineItem.quantity} pcs
                      </h1>
                    ))}
                  </div>
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
      </div>
    </div>
  );
};

export default OrderModal;
