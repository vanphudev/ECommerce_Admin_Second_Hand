import { faker } from '@faker-js/faker';

/**
 * Generate a list of mock products
 */
export const generateProductList = (count) => {
   return Array.from({ length: count }, () => ({
      id: faker.datatype.uuid(),
      productName: faker.commerce.productName(),
      typeProduct: faker.commerce.department(),
      price: faker.datatype.number({ min: 50000, max: 500000 }),
      inventory: faker.datatype.number({ min: 10, max: 200 }),
      sold: faker.datatype.number({ min: 0, max: 100 }),
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description: faker.commerce.productDescription(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
   }));
};

// Generate 10 products
export const PRODUCT_LIST = generateProductList(50);
