import { faker } from '@faker-js/faker';

const generatePaymentData = (numberPayment) => {
   const payments = [];
   for (let i = 0; i < numberPayment; i++) {
      const payment = {
         payment_id: faker.datatype.uuid(),
         order_id: faker.datatype.uuid(),
         amount: faker.datatype.number({ min: 1, max: 200 }),
         method: faker.helpers.arrayElement(['COD', 'Credit Card', 'PayPal', 'Bank Transfer', 'E-wallet']),
         status: faker.helpers.arrayElement(['Pending', 'Completed', 'Failed']),
      };
      payments.push(payment);
   }
   return payments;
};

export { generatePaymentData };
