import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateBasicAdminProfile = () => {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        phone: generateVietnamesePhoneNumber(),
        avatar: faker.image.avatarGitHub(),
    };
};

const generateVietnamesePhoneNumber = () => {
    const prefixes = ['09', '08', '07', '03', '05', '04'];
    const prefix = faker.helpers.arrayElement(prefixes);
    const number = faker.datatype.number({ min: 10000000, max: 99999999 });
    return `${prefix}${number}`;
};

// Tạo dữ liệu mock cho tài khoản admin cơ bản
export const BasicAdminProfile = generateBasicAdminProfile();

