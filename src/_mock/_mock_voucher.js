import { faker } from '@faker-js/faker';

const formatCurrency = (amount) => {
   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
   }).format(amount);
};

const generateVoucherData = (numberOfVouchers) => {
   const vouchers = [];
   for (let i = 0; i < numberOfVouchers; i++) {
      const discountValue = faker.datatype.number({ min: 10000, max: 500000 });
      const expiryDate = faker.date.future().toISOString().split('T')[0]; 
      const validFrom = faker.date.recent().toISOString().split('T')[0]; 

      const voucher = {
         voucherCode: i+1,
         voucherName: faker.commerce.productName(), 
         voucherType: faker.helpers.arrayElement(['Giảm giá theo phần trăm', 'Giảm giá theo số tiền', 'Miễn phí vận chuyển']), 
         value: formatCurrency(discountValue), 
         startDate: validFrom, 
         endDate: expiryDate, 
         maxUsage: faker.datatype.number({ min: 50, max: 500 }), 
         conditions: `Áp dụng cho đơn hàng từ ${formatCurrency(faker.datatype.number({ min: 200000, max: 1000000 }))}`, 
         status: faker.helpers.arrayElement(['Hoạt động', 'Hết hạn', 'Chưa áp dụng']), 
         userType: faker.helpers.arrayElement(['Tất cả khách hàng', 'Khách hàng mới', 'Khách hàng cũ']),
         isSingleUse: faker.datatype.boolean(), 
         description: faker.lorem.sentence(), 
const generateVoucherData = (numberVoucher) => {
   const vouchers = [];
   for (let i = 0; i < numberVoucher; i++) {
      const voucher = {
         voucher_id: faker.datatype.uuid(),
         voucher_name: faker.lorem.words(),
         description: faker.lorem.sentence(),
         discount_rate: faker.datatype.number({ min: 5, max: 70 }),
         expired_at: faker.date.future(),
         is_active: faker.datatype.boolean(),
      };
      vouchers.push(voucher);
   }
   return vouchers;
};

const numberOfVouchers = 50;
export const VoucherData = generateVoucherData(numberOfVouchers);
