export interface Payment {
   payment_id: string;
   order_id: string;
   amount: number;
   method: 'COD' | 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'E-wallet';
   status: 'Pending' | 'Completed' | 'Failed';
}
