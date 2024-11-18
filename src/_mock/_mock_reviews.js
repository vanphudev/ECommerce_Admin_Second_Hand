import { faker } from '@faker-js/faker';

export const generateReviewsData = (numberOfReviews) => {
   const reviews = [];

   for (let i = 0; i < numberOfReviews; i++) {
      const review = {
         reviewId: faker.datatype.uuid(),
         productId: faker.datatype.uuid(),
         userId: faker.datatype.uuid(),
         rating: faker.datatype.number({ min: 1, max: 5 }),
         comment: faker.lorem.sentence(),
         createdAt: faker.date.recent().toISOString().split('T')[0],
         updatedAt: faker.date.recent().toISOString().split('T')[0],
         isVerifiedPurchase: faker.datatype.boolean(),
         user: {
            userId: faker.datatype.uuid(),
            fullName: faker.name.fullName(),
            email: faker.internet.email(),
            profileImage: faker.image.avatar(),
         },
         product: {
            productId: faker.datatype.uuid(),
            productName: faker.commerce.productName(),
            productImage: faker.image.imageUrl(),
            price: parseFloat(faker.commerce.price()),
            description: faker.commerce.productDescription(),
            quantity: faker.datatype.number({ min: 1, max: 100 }),
         },
      };
      reviews.push(review);
   }

   return reviews;
};
