import { faker } from '@faker-js/faker';


const formatDate = (date) => {
   return new Date(date).toLocaleDateString('vi-VN');  
};

const generateMockBackupData = (numberOfBackups) => {
   const backups = [];
   for (let i = 0; i < numberOfBackups; i++) {
      const backup = {
         fileName: `Backup_${faker.date.past(1).getFullYear()}_${faker.datatype.number(9999)}.zip`, 
         fileSize: faker.datatype.number({ min: 100, max: 5000 }), 
         backupDate: formatDate(faker.date.recent()),
         location: faker.helpers.arrayElement(['Lưu trữ cục bộ', 'Lưu trữ đám mây', 'Ổ cứng ngoài']), 
         status: faker.helpers.arrayElement(['Hoàn thành', 'Thất bại', 'Đang tiến hành']),
         restoreAvailable: faker.datatype.boolean()
      };
      backups.push(backup);
   }
   return backups;
};

const numberOfBackups = 50;
export const BackupData = generateMockBackupData(numberOfBackups);
