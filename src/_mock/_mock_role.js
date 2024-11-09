import { faker } from '@faker-js/faker';
import { BasicStatus } from '#/enum';
import { Permission } from '#/entity'; // Import Permission nếu là một enum

const generateRoleData = (numberRoles) => {
    const roles = [];
    for (let i = 0; i < numberRoles; i++) {
        const role = {
            id: faker.datatype.uuid(),
            name: faker.lorem.word(),
            label: faker.name.jobTitle(),
            status: faker.helpers.arrayElement([BasicStatus.ENABLE, BasicStatus.DISABLE]),
            permission: faker.helpers.arrayElements(
                [Permission.View, Permission.Edit, Permission.Delete],
                faker.datatype.number({ min: 1, max: 3 })
            ),
            order: i + 1,
            desc: faker.lorem.sentence(),
        };
        roles.push(role);
    }
    return roles;
};

const numberRoles = 10;
const roleData = generateRoleData(numberRoles);

export { roleData };
