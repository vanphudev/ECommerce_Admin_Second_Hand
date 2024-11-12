import { faker } from '@faker-js/faker';
import fs from 'fs';

const formatCurrency = (amount) => {
   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
   }).format(amount);
};

const generateSaleChannelData = (numberOfSaleChannels) => {
   const SaleChannels = [];
   for (let i = 0; i < numberOfSaleChannels; i++) {
      const products = generateSaleChannelProducts();
      const totalPurchase = products.reduce((total, product) => total + product.price * product.stock_quantity, 0);
      const outstandingBalance = (totalPurchase * 0.05).toFixed(2);

      const SaleChannel = {
         SaleChannel_id: i + 1,
         SaleChannel_name: faker.company.name(),
         SaleChannel_contact: {
            phone: generateVietnamesePhoneNumber(),
            email: faker.internet.email(),
            website: faker.internet.url(),
         },
         address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            district: faker.address.cityName(),
            ward: faker.address.streetName(),
         },
         creator: {
            creator_id: faker.datatype.uuid(),
            creator_name: faker.name.fullName(),
         },
         company: faker.company.name(),
         supplierGroup: faker.company.bsNoun(),
         creator: faker.name.fullName(),
         creation_date: faker.date.past().toISOString().split('T')[0],
         products: products,
         total_purchase: formatCurrency(totalPurchase),
         outstanding_balance: formatCurrency(outstandingBalance),
         rating: parseFloat(faker.commerce.price({ min: 1, max: 5, dec: 1 })),
         supply_date: faker.date.recent().toISOString().split('T')[0],
      };
      SaleChannels.push(SaleChannel);
   }
   return SaleChannels;
};
const generateVietnamesePhoneNumber = () => {
   const prefixes = ['09', '08', '07', '03', '05', '04'];
   const prefix = faker.helpers.arrayElement(prefixes);
   const number = faker.datatype.number({ min: 10000000, max: 99999999 });
   return `${prefix}${number}`;
};
const generateSaleChannelProducts = (minProducts = 5, maxProducts = 15) => {
   const products = [];
   const numberOfProducts = faker.datatype.number({ min: minProducts, max: maxProducts });
   for (let i = 0; i < numberOfProducts; i++) {
      products.push({
         product_id: faker.datatype.uuid(),
         product_name: faker.commerce.productName(),
         description: faker.commerce.productDescription(),
         price: parseFloat(faker.commerce.price()),
         stock_quantity: faker.datatype.number({ min: 10, max: 100 }),
         receiving_area: faker.address.city(),
         status: faker.helpers.arrayElement(['Chờ xử lý', 'Đang giao hàng', 'Hoàn thành', 'Hủy bỏ']),
      });
   }
   return products;
};

const numberOfSaleChannels = 10;
export const SaleChannelData = generateSaleChannelData(numberOfSaleChannels);
