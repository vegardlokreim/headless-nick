export type WooCommerceImage = {
    id: number;
    src: string;
  };
  
  export type WooCommerceProduct = {
    id: number;
    name: string;
    stock_quantity: number;
    price: number;
    backorders_allowed: boolean;
    images: WooCommerceImage[];
    stock_status: string;
    description: string
  };
  
  export type WooCommerceProductList = {
    products: WooCommerceProduct[];
  };


 export type ProductCardProps = {
    product: WooCommerceProduct;
  };


  export type WoocommerceCartItem = {
    id: number;
    name: string;
    quantity: number;
    stock_quantity: number;
    price: number;
    backorders_allowed: boolean;
    image: string;
  }
  

  export type CartState = {
    items: WoocommerceCartItem[];
    totalQuantity: number;
    totalAmount: number;
    klarnaOrderId: string;
    klarnaHtmlSnippet: string;
    wooOrderId: number;
    isLoggedIn: boolean;
  }

  export type UpdateCartProps = {
    id: number; 
    quantity: number
  }

  export type KlarnaOrderResponse = {
    klarnaOrderId: string;
    wooOrderId: number;
    klarnaHtmlSnippet: string;
  }

 
  

  export type WoocommerceLineItem = {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: {
      id: number;
      total: string;
      subtotal: string;
    }[];
    meta_data: {
      id: number;
      key: string;
      value: string;
      display_key: string;
      display_value: string;
    }[];
    sku: string;
    price: number;
    image: {
      id: string;
      src: string;
    };
    parent_name: string | null;
  };

  export type WoocommerceOrderResponse = {
    id: number;
    parent_id: number;
    status: string;
    currency: string;
    version: string;
    prices_include_tax: boolean;
    date_created: string;
    date_modified: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    customer_id: number;
    order_key: string;
    billing: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
      email: string;
      phone: string;
    };
    shipping: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
      phone: string;
    };
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    customer_ip_address: string;
    customer_user_agent: string;
    created_via: string;
    customer_note: string;
    date_completed: string | null;
    date_paid: string;
    cart_hash: string;
    number: string;
    meta_data: {
      id: number;
      key: string;
      value: string;
    }[];
    line_items: WoocommerceLineItem[];
    tax_lines: {
      id: number;
      rate_code: string;
      rate_id: number;
      label: string;
      compound: boolean;
      tax_total: string;
      shipping_tax_total: string;
      rate_percent: number;
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];
    shipping_lines: {
      id: number;
      method_title: string;
      method_id: string;
      total: string;
      total_tax: string;
      taxes: {
        id: number;
        total: string;
      }[];
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];
    fee_lines: {
      id: number;
      name: string;
      tax_class: string;
      tax_status: string;
      amount: string;
      total: string;
      total_tax: string;
      taxes: {
        id: number;
        total: string;
      }[];
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];
    coupon_lines: {
      id: number;
      code: string;
      discount: string;
      discount_tax: string;
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];
    refunds: {
      id: number;
      reason: string;
      total: string;
      tax_total: string;
      shipping_tax_total: string;
      line_items: {
        id: number;
        subtotal: string;
        subtotal_tax: string;
        total: string;
        total_tax: string;
        meta_data: {
          id: number;
          key: string;
          value: string;
        }[];
      }[];
      payment_refund_id: string | null;
      meta_data: {
        id: number;
        key: string;
        value: string;
      }[];
    }[];
    payment_url: string;
    is_editable: boolean;
    needs_payment: boolean;
    needs_processing: boolean;
    date_created_gmt: string;
    date_modified_gmt: string;
    date_completed_gmt: string | null;
    date_paid_gmt: string;
    currency_symbol: string;
    _links: {
      self: { href: string }[];
      collection: { href: string }[];
      customer: { href: string }[];
    };
  };
  

  export type WoocommerceCustomerResponse = {
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    username: string;
    billing: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      postcode: string;
      country: string;
      state: string;
      email: string;
      phone: string;
    };
    shipping: {
      first_name: string;
      last_name: string;
      company: string;
      address_1: string;
      address_2: string;
      city: string;
      postcode: string;
      country: string;
      state: string;
      phone: string;
    };
    is_paying_customer: boolean;
    avatar_url: string;
    meta_data: {
      id: number;
      key: string;
      value: string;
    }[];
    _links: {
      self: {
        href: string;
      }[];
      collection: {
        href: string;
      }[];
    };
  }
  