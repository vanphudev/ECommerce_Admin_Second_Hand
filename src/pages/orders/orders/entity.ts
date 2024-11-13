export interface Address {
   street: string;
   city: string;
   district: string;
   ward: string;
}

export interface Store {
   store_id: string;
   store_name: string;
   store_address: Address;
   store_phone: string;
   store_email: string;
   store_image: string;
}

export interface Customer {
   customer_id: string;
   customer_image: string;
   name: string;
   phone: string;
   gender: 'Nam' | 'Nữ' | 'Khác';
   email: string;
   address: Address;
}

export interface Item {
   product_id: string;
   product_name: string;
   description: string;
   product_image: string;
   price: number;
   quantity: number;
}

export interface OrderDetails {
   total_items: number;
   total_price: string;
   order_date: string;
   order_note: string;
   payment_method: 'COD' | 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'E-wallet';
   order_status: string;
   voucher: string | null;
   discount_rate: string;
   discount_amount: string;
   final_price: string;
}

export interface Shipping {
   shipping_address: Address;
   shipping_fee: number;
   shipping_method: 'Standard' | 'Express' | 'SPX';
   estimated_delivery_date: string;
}

export interface Device {
   device_type: 'Mobile' | 'Desktop' | 'Tablet' | 'Laptop';
   operating_system: 'iOS' | 'Android' | 'Windows' | 'MacOS';
   browser: string;
   ip_address: string;
}

export interface Order {
   order_id: string;
   store: Store;
   customer: Customer;
   items: Item[];
   order_details: OrderDetails;
   shipping: Shipping;
   device: Device;
}
