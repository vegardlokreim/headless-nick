import { RootState } from "@/state/store";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const router = useRouter();
  const [orderData] = useState({
    orderId: useSelector((state: RootState) => state.cart.klarnaOrderId),
    htmlSnippet: useSelector((state: RootState) => state.cart.klarnaHtmlSnippet),
  });
  const checkoutContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orderData.htmlSnippet) {
      const container = checkoutContainer.current;
      container!.innerHTML = orderData.htmlSnippet;
      const scriptsTags = container?.getElementsByTagName("script");
      for (let i = 0; i < scriptsTags!.length; i++) {
        const parentNode = scriptsTags![i].parentNode;
        const newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.text = scriptsTags![i].text;
        parentNode!.removeChild(scriptsTags![i]);
        parentNode!.appendChild(newScriptTag);
      }
    }

    if (orderData.orderId === "") {
      router.push("/cart");
    }
  }, [orderData.htmlSnippet]);

  return (
    <div>
      <div ref={checkoutContainer} id="my-checkout-container"></div>
    </div>
  );
};

export default Checkout;
