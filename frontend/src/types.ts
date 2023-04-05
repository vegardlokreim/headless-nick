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