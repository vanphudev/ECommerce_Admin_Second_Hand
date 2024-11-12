import { faker } from '@faker-js/faker';

/**
 * Product data mock
 */
export const PRODUCT_LIST = [
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29401',
      productName: 'Sữa Rửa Mặt Dịu Nhẹ',
      typeProduct: 'Chăm sóc da mặt',
      price: 100000,
      inventory: 100,
      sold: 15,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Sữa rửa mặt với công thức dịu nhẹ, giúp làm sạch sâu lỗ chân lông, loại bỏ bụi bẩn và dầu thừa một cách hiệu quả. Sản phẩm này phù hợp cho mọi loại da và mang lại cảm giác tươi mát, sảng khoái sau mỗi lần sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29402',
      productName: 'Kem Dưỡng Ẩm Da Mặt',
      typeProduct: 'Dưỡng ẩm',
      price: 200000,
      inventory: 50,
      sold: 20,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Kem dưỡng da cao cấp giúp cung cấp độ ẩm và dưỡng chất cho làn da mịn màng, tươi trẻ. Với chiết xuất từ các thành phần tự nhiên, sản phẩm thấm nhanh vào da mà không gây nhờn rít, bảo vệ da khỏi các tác nhân gây hại từ môi trường.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29403',
      productName: 'Son Lì Cao Cấp',
      typeProduct: 'Trang điểm môi',
      price: 150000,
      inventory: 80,
      sold: 30,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Son môi với chất son lì mịn màng, bền màu suốt cả ngày dài. Sản phẩm chứa các dưỡng chất giúp đôi môi luôn mềm mịn, không bị khô hay nứt nẻ. Bảng màu đa dạng phù hợp với nhiều phong cách trang điểm.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29404',
      productName: 'Nước Hoa Quyến Rũ',
      typeProduct: 'Nước hoa',
      price: 300000,
      inventory: 40,
      sold: 10,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Nước hoa cao cấp với hương thơm quyến rũ và tinh tế, lưu hương lâu dài để bạn tự tin suốt ngày dài. Mỗi giọt nước hoa là sự kết hợp tinh tế giữa các tầng hương từ các loại hoa và trái cây tự nhiên.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29405',
      productName: 'Kem Chống Nắng Da Mặt',
      typeProduct: 'Chống nắng',
      price: 250000,
      inventory: 60,
      sold: 25,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Kem chống nắng với chỉ số SPF cao giúp bảo vệ làn da khỏi tác hại của tia UV. Sản phẩm thấm nhanh, không gây bết dính, và phù hợp cho mọi loại da. Được bổ sung dưỡng chất giúp dưỡng ẩm và làm dịu da trong quá trình sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29406',
      productName: 'Tinh Chất Dưỡng Da',
      typeProduct: 'Dưỡng da',
      price: 350000,
      inventory: 70,
      sold: 18,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Tinh chất dưỡng da với công thức đặc biệt giúp cung cấp độ ẩm và dưỡng chất cho làn da khỏe mạnh, tươi trẻ. Sản phẩm thấm nhanh vào da, không gây nhờn rít và phù hợp cho mọi loại da.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29407',
      productName: 'Mặt Nạ Dưỡng Da',
      typeProduct: 'Chăm sóc da mặt',
      price: 50000,
      inventory: 200,
      sold: 50,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Mặt nạ dưỡng da với chiết xuất từ thiên nhiên giúp cung cấp độ ẩm và dưỡng chất cho làn da mịn màng, tươi trẻ. Sản phẩm phù hợp cho mọi loại da và mang lại cảm giác thư giãn, sảng khoái sau mỗi lần sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29408',
      productName: 'Sữa Tắm Trắng Da',
      typeProduct: 'Chăm sóc cơ thể',
      price: 120000,
      inventory: 90,
      sold: 35,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Sữa tắm trắng da với công thức đặc biệt giúp làm sạch da và cung cấp dưỡng chất cho làn da trắng sáng, mịn màng. Sản phẩm phù hợp cho mọi loại da và mang lại cảm giác tươi mát, sảng khoái sau mỗi lần sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29409',
      productName: 'Dầu Gội Dưỡng Tóc',
      typeProduct: 'Chăm sóc tóc',
      price: 180000,
      inventory: 110,
      sold: 40,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Dầu gội dưỡng tóc với chiết xuất từ thiên nhiên giúp làm sạch da đầu và cung cấp dưỡng chất cho mái tóc khỏe mạnh, bóng mượt. Sản phẩm phù hợp cho mọi loại tóc và mang lại cảm giác tươi mát, sảng khoái sau mỗi lần sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
   {
      id: 'efaa20ea-4dc5-47ee-a200-8a899be29410',
      productName: 'Kem Tẩy Tế Bào Chết',
      typeProduct: 'Chăm sóc da mặt',
      price: 90000,
      inventory: 150,
      sold: 45,
      imageProduct:
         'https://s3-alpha-sig.figma.com/img/8e4f/8112/2b0eec3cd0bc73e14e2817123cfe7064?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghkWDeDhtrsmAwzGSZldbO9MEGhFGWxw~lanK4MrTM-QS5XmiEIzfmGdeEd6xvENvsf8ecyI0HlsVA797tkOuRICSDBwTxJza2x6UHwzeejXc4ypogGkr-0Zw26bTxKg0en2aXacf6TRbLwEf3-qtPga2L~lt-eweFEZZc1QqLx43iHbmW1RRQrmzugHHwGCshMJbNIrjxkGTuqqJSzCKmp5hG7Z9fAfZT7icPK1HtSNzxFGh4r4KPwsslCFSVpmNpBikhMh0FDQc10m-Ii03k5VFmoSNHXRl57d64n9q41Cy3GezLdLWFYYALPRXPZRlseXtceqJIA1RAVjKLikKQ__',
      description:
         'Kem tẩy tế bào chết với công thức dịu nhẹ giúp loại bỏ tế bào chết và bụi bẩn trên da, mang lại làn da mịn màng, tươi sáng. Sản phẩm phù hợp cho mọi loại da và mang lại cảm giác tươi mát, sảng khoái sau mỗi lần sử dụng.',
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.recent(),
   },
];
// Generate random product data
for (let i = 0; i < PRODUCT_LIST.length; i++) {
   PRODUCT_LIST[i].id = faker.datatype.uuid();
   PRODUCT_LIST[i].price = faker.datatype.number({ min: 50000, max: 500000 });
   PRODUCT_LIST[i].inventory = faker.datatype.number({ min: 10, max: 200 });
   PRODUCT_LIST[i].sold = faker.datatype.number({ min: 0, max: PRODUCT_LIST[i].inventory });
}
