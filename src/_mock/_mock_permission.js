import { faker } from '@faker-js/faker';
import fs from 'fs';
import { PermissionType, BasicStatus } from '#/enum'; // Import các enum

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    }).format(amount);
};

const generatePermissionData = (numberPermissions) => {
    const permissions = [];
    for (let i = 0; i < numberPermissions; i++) {
        const permission = {
            id: faker.datatype.uuid(),
            parentId: faker.datatype.uuid(),
            name: faker.lorem.words(2),
            label: faker.lorem.word(),
            route: faker.internet.url(),
            component: faker.lorem.word(),
            icon: faker.helpers.arrayElement(['ic-home', 'ic-settings', 'ic-user']),
            hide: faker.datatype.boolean(),
            status: faker.helpers.arrayElement([BasicStatus.ENABLE, BasicStatus.DISABLE]), 
            type: faker.helpers.arrayElement([PermissionType.CATALOGUE, PermissionType.MENU]), 
            order: faker.datatype.number({ min: 1, max: 100 }),
            description: faker.lorem.sentence(),
            created_at: faker.date.past().toISOString().split('T')[0],
            updated_at: faker.date.recent().toISOString().split('T')[0],
        };
        permissions.push(permission);
    }
    return permissions;
};

const numberPermissions = 10;
const permissionData = generatePermissionData(numberPermissions);

export { permissionData }; // Sử dụng export với tên cụ thể
