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
    date_paid: string | null;
    cart_hash: string;
    number: string;
    meta_data: any[];
    line_items: any[];
    tax_lines: any[];
    shipping_lines: any[];
    fee_lines: any[];
    coupon_lines: any[];
    refunds: any[];
    payment_url: string;
    is_editable: boolean;
    needs_payment: boolean;
    needs_processing: boolean;
    date_created_gmt: string;
    date_modified_gmt: string;
    date_completed_gmt: string | null;
    date_paid_gmt: string | null;
    currency_symbol: string;
    _links: {
      self: {
        href: string;
      }[];
      collection: {
        href: string;
      }[];
    };
  };
  