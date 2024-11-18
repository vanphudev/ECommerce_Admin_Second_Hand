import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';

export const ORG_LIST = [
   {
      id: '1',
      name: 'East China Branch',
      status: 'enable',
      desc: faker.lorem.words(),
      order: 1,
      children: [
         { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
         { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
         { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
      ],
   },
   {
      id: '2',
      name: 'South China Branch',
      status: 'enable',
      desc: faker.lorem.words(),
      order: 2,
      children: [
         { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
         { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
         { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
      ],
   },
];

const DASHBOARD_PERMISSION = {
   id: '10001',
   parentId: '',
   label: 'sys.menu.dashboard.index',
   name: 'Dashboard',
   icon: 'ic-analysis',
   type: PermissionType.CATALOGUE,
   route: 'dashboard',
   order: 1,
   children: [
      {
         id: '100011',
         parentId: '10001',
         label: 'sys.menu.dashboard.workbench',
         name: 'Workbench',
         type: PermissionType.MENU,
         route: 'workbench',
         component: '/dashboard/workbench/index.tsx',
      },
      {
         id: '100012',
         parentId: '10001',
         label: 'sys.menu.dashboard.analysis',
         name: 'Analysis',
         type: PermissionType.MENU,
         route: 'analysis',
         component: '/dashboard/analysis/index.tsx',
      },
   ],
};
const MANAGEMENT_PERMISSION = {
   id: '10002',
   parentId: '',
   label: 'sys.menu.management.index',
   name: 'Management',
   icon: 'ic-management',
   type: PermissionType.CATALOGUE,
   route: 'management',
   order: 2,
   children: [
      {
         id: '100021',
         parentId: '10002',
         label: 'sys.menu.management.products',
         name: 'Products',
         type: PermissionType.MENU,
         route: 'products',
         component: '/management/products/index.tsx',
      },
      {
         id: '100024',
         parentId: '10002',
         label: 'sys.menu.management.payment-methods',
         name: 'Payment Methods',
         type: PermissionType.MENU,
         route: 'payment-methods',
         component: '/management/payment-methods/index.tsx',
      },
      {
         id: '100026',
         parentId: '10002',
         label: 'sys.menu.management.reviews',
         name: 'Reviews',
         type: PermissionType.MENU,
         route: 'reviews',
         component: '/management/reviews/index.tsx',
      },
   ],
};
const USERS_PERMISSION = {
   id: '10003',
   parentId: '',
   label: 'sys.menu.users.index',
   name: 'Users',
   icon: 'heroicons:user-group-solid',
   type: PermissionType.CATALOGUE,
   route: 'users',
   order: 3,
   children: [
      {
         id: '100031',
         parentId: '10003',
         label: 'sys.menu.users.permission',
         name: 'Permission',
         type: PermissionType.MENU,
         route: 'permission',
         component: '/users/permission/index.tsx',
      },
      {
         id: '100033',
         parentId: '10003',
         label: 'sys.menu.users.user',
         name: 'User',
         type: PermissionType.MENU,
         route: 'user',
         component: '/users/user/index.tsx',
      },
   ],
};
const SALESCHANNEL_PERMISSION = {
   id: '10005',
   parentId: '',
   label: 'sys.menu.sales-channel.index',
   name: 'Sales Channel',
   icon: 'carbon:sales-ops',
   type: PermissionType.CATALOGUE,
   route: 'sales-channel',
   order: 5,
   children: [
      {
         id: '100051',
         parentId: '10005',
         label: 'sys.menu.sales-channel.sales-channel',
         name: 'Sales Channel',
         type: PermissionType.MENU,
         route: 'sales-channel',
         component: '/sales-channel/sales-channel/index.tsx',
      },
   ],
};
const SYSTEM_PERMISSION = {
   id: '10006',
   parentId: '',
   label: 'sys.menu.system.index',
   name: 'System',
   icon: 'solar:database-bold-duotone',
   type: PermissionType.CATALOGUE,
   route: 'system',
   order: 6,
   children: [
      {
         id: '100061',
         parentId: '10006',
         label: 'sys.menu.system.backup',
         name: 'Backup',
         type: PermissionType.MENU,
         route: 'backup',
         component: '/system/backup/index.tsx',
      },
      {
         id: '100062',
         parentId: '10006',
         label: 'sys.menu.system.restore',
         name: 'Restore',
         type: PermissionType.MENU,
         route: 'restore',
         component: '/system/restore/index.tsx',
      },
      {
         id: '100063',
         parentId: '10006',
         label: 'sys.menu.system.setting',
         name: 'Setting',
         type: PermissionType.MENU,
         route: 'setting',
         component: '/system/setting/index.tsx',
      },
   ],
};
const ORDERS_PERMISSION = {
   id: '10007',
   parentId: '',
   label: 'sys.menu.orders.index',
   name: 'Orders',
   icon: 'material-symbols:shopping-cart-checkout',
   type: PermissionType.MENU,
   newFeature: true,
   iconNewFeature: 'icon-park:buy',
   route: 'orders',
   order: 7,
   component: '/orders/orders/index.tsx',
};
const VOUCHERS_PERMISSION = {
   id: '10008',
   parentId: '',
   label: 'sys.menu.vouchers.index',
   name: 'Vouchers',
   icon: 'mdi:voucher',
   type: PermissionType.CATALOGUE,
   route: 'vouchers',
   order: 8,
   children: [
      {
         id: '100081',
         parentId: '10008',
         label: 'sys.menu.vouchers.voucher',
         name: 'Voucher',
         type: PermissionType.MENU,
         route: 'voucher',
         component: '/vouchers/voucher/index.tsx',
      },
   ],
};
const INFORMATION_PERMISSION = {
   id: '10009',
   parentId: '',
   label: 'sys.menu.information.index',
   name: 'Information',
   icon: 'fa-solid:user-edit',
   type: PermissionType.CATALOGUE,
   route: 'information',
   order: 9,
   children: [
      {
         id: '100091',
         parentId: '10009',
         label: 'sys.menu.information.profile',
         name: 'Profile',
         type: PermissionType.MENU,
         route: 'profile',
         component: '/information/profile/index.tsx',
      },
      {
         id: '100092',
         parentId: '10009',
         label: 'sys.menu.information.logout',
         name: 'Logout',
         type: PermissionType.MENU,
         route: 'logout',
         newFeature: true,
         iconNewFeature: 'uim:signout',
         component: '/information/logout/index.tsx',
      },
   ],
};

export const PERMISSION_LIST = [
   DASHBOARD_PERMISSION,
   MANAGEMENT_PERMISSION,
   USERS_PERMISSION,
   SALESCHANNEL_PERMISSION,
   SYSTEM_PERMISSION,
   ORDERS_PERMISSION,
   VOUCHERS_PERMISSION,
   INFORMATION_PERMISSION,
];

const ADMIN_ROLE = {
   id: '4281707933534332',
   name: 'Admin',
   label: 'admin',
   status: BasicStatus.ENABLE,
   order: 1,
   desc: 'Super Admin',
   permission: PERMISSION_LIST,
};
const TEST_ROLE = {
   id: '9931665660771476',
   name: 'Test',
   label: 'test',
   status: BasicStatus.ENABLE,
   order: 2,
   desc: 'test',
   permission: [DASHBOARD_PERMISSION, MANAGEMENT_PERMISSION, USERS_PERMISSION],
};

export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

export const DEFAULT_USER = {
   id: 'b34719e1-ce46-457e-9575-99505ecee828',
   username: 'admin',
   email: faker.internet.email(),
   avatar: faker.image.avatarGitHub(),
   createdAt: faker.date.anytime(),
   updatedAt: faker.date.recent(),
   password: 'demo1234',
   role: ADMIN_ROLE,
   permissions: ADMIN_ROLE.permission,
};

export const TEST_USER = {
   id: 'efaa20ea-4dc5-47ee-a200-8a899be29494',
   username: 'test',
   password: 'demo1234',
   email: faker.internet.email(),
   avatar: faker.image.avatarGitHub(),
   createdAt: faker.date.anytime(),
   updatedAt: faker.date.recent(),
   role: TEST_ROLE,
   permissions: TEST_ROLE.permission,
};

export const USER_LIST = [DEFAULT_USER, TEST_USER];
