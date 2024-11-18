import { faker } from '@faker-js/faker';

const generateUserData = (numberOfUsers) => {
   const users = [];
   for (let i = 0; i < numberOfUsers; i++) {
      const user = {
         userId: faker.datatype.uuid(),
         email: faker.internet.email(),
         phone: faker.phone.number('+84 ### ### ###'),
         fullName: faker.name.fullName(),
         gender: faker.helpers.arrayElement(['male', 'female', 'other']),
         birthday: faker.date.birthdate({ min: 14, max: 80, mode: 'age' }).toISOString().split('T')[0],
         username: faker.internet.userName(),
         profileImage: faker.image.avatar(),
      };
      users.push(user);
   }
   return users;
};

export { generateUserData };
