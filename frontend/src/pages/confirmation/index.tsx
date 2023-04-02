import axios from "axios";
import React, { useEffect, useRef } from "react";

import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "@/state/slices/cartSlice";

type Props = {
  klarnaHtmlSnippet: string;
  status: string;
};

export default function Confirmation({ klarnaHtmlSnippet, status }: Props) {
  const checkoutContainer = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (klarnaHtmlSnippet) {
      const container = checkoutContainer.current;
      container!.innerHTML = klarnaHtmlSnippet;
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

    if (status === "checkout_complete") {
      dispatch(clearCart());
    }
  }, [klarnaHtmlSnippet]);
  return (
    <div>
      <div ref={checkoutContainer} id="my-checkout-container"></div>
    </div>
  );
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const orderId = query.orderId as string;
  const { data }: { data: { klarnaHtmlSnippet: string; status: string } } = await axios.get(`http://localhost:4000/orders/getKlarnaOrder/${orderId}`);

  return {
    props: {
      klarnaHtmlSnippet: data.klarnaHtmlSnippet,
      status: data.status,
    },
  };
};
