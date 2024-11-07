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

const generateOrderData = (numberOrder, minProducts = 1, maxProducts = 10) => {
   const orders = [];
   for (let i = 0; i < numberOrder; i++) {
      const numberOfProducts = faker.datatype.number({ min: minProducts, max: maxProducts });
      const items = [];
      for (let j = 0; j < numberOfProducts; j++) {
         items.push({
            product_id: faker.datatype.uuid(),
            product_name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            product_image: faker.image.imageUrl(),
            price: parseFloat(faker.commerce.price()),
            quantity: faker.datatype.number({ min: 1, max: 10 }),
         });
      }
      const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
      const isVoucherApplied = faker.datatype.boolean();
      const discountRate = isVoucherApplied ? faker.datatype.number({ min: 5, max: 70 }) : 0;
      const discountAmount = (totalPrice * discountRate) / 100;
      const finalPrice = (totalPrice - discountAmount).toFixed(2);
      const order = {
         order_id: faker.datatype.uuid(),
         store: {
            store_id: faker.datatype.uuid(),
            store_name: faker.company.name(),
            store_address: {
               street: faker.address.streetAddress(),
               city: faker.address.city(),
               district: faker.address.cityName(),
               ward: faker.address.streetName(),
            },
            store_phone: faker.phone.number(),
            store_email: faker.internet.email(),
            store_image: faker.image.business(),
         },
         customer: {
            customer_id: faker.datatype.uuid(),
            customer_image: faker.image.avatar(),
            name: faker.name.fullName(),
            phone: faker.phone.number(),
            gender: faker.helpers.arrayElement(['Nam', 'Nữ', 'Khác']),
            email: faker.internet.email(),
            address: {
               street: faker.address.streetAddress(),
               city: faker.address.city(),
               district: faker.address.cityName(),
               ward: faker.address.streetName(),
            },
         },
         items: items,
         order_details: {
            total_items: items.length,
            total_price: totalPrice.toFixed(2),
            order_date: faker.date.recent().toISOString().split('T')[0],
            order_note: faker.lorem.sentence(),
            payment_method: faker.helpers.arrayElement(['COD', 'Credit Card', 'PayPal', 'Bank Transfer', 'E-wallet']),
            order_status: faker.helpers.arrayElement([
               'Chờ xác nhận',
               'Đã tiếp nhận đơn',
               'Đang xử lý',
               'Đang đóng gói',
               'Đã bàn giao vận chuyển',
               'Đang vận chuyển',
               'Đã giao',
               'Đã hủy',
            ]),
            voucher: isVoucherApplied ? faker.datatype.uuid() : null,
            discount_rate: isVoucherApplied ? `${discountRate}%` : '0%',
            discount_amount: formatCurrency(discountAmount),
            final_price: formatCurrency(finalPrice),
         },
         shipping: {
            shipping_address: {
               street: faker.address.streetAddress(),
               city: faker.address.city(),
               district: faker.address.cityName(),
               ward: faker.address.streetName(),
            },
            shipping_fee: parseFloat(faker.commerce.price()),
            shipping_method: faker.helpers.arrayElement(['Standard', 'Express', 'SPX']),
            estimated_delivery_date: faker.date.soon().toISOString().split('T')[0],
         },
         device: {
            device_type: faker.helpers.arrayElement(['Mobile', 'Desktop', 'Tablet', 'Laptop']),
            operating_system: faker.helpers.arrayElement(['iOS', 'Android', 'Windows', 'MacOS']),
            browser: faker.internet.userAgent(),
            ip_address: faker.internet.ip(),
         },
      };
      orders.push(order);
   }
   return orders;
};

const numberOrder = 10;
const orderData = generateOrderData(numberOrder);
console.log(JSON.stringify(orderData, null, 2));
fs.writeFileSync(
   'E:\\INTERNSHIP\\InternFE\\second_hand_intern\\admin_second_hand\\src\\_mock\\_orders.json',
   JSON.stringify(orderData, null, 2),
   'utf-8',
);
