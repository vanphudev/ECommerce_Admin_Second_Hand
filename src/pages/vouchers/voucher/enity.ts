export interface Voucher {
   voucher_id: string;
   voucher_name: string;
   description: string;
   discount_rate: number;
   expired_at: Date;
   is_active: boolean;
}
