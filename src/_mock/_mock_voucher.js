import { faker } from '@faker-js/faker';
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
export { generateVoucherData };