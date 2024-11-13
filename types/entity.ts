import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
   accessToken?: string;
   refreshToken?: string;
}

export interface UserInfo {
   userId: string;
   email?: string;
   phone?: string;
   fullName?: JSON;
   gender?: string;
   birthday?: string;
   username?: string;
   profileImage?: string;
}

export interface Organization {
   id: string;
   name: string;
   status: 'enable' | 'disable';
   desc?: string;
   order?: number;
   children?: Organization[];
}

export interface Permission {
   id: string;
   parentId: string;
   name: string;
   label: string;
   type: PermissionType;
   route: string;
   status?: BasicStatus;
   order?: number;
   icon?: string;
   component?: string;
   hide?: boolean;
   hideTab?: boolean;
   frameSrc?: string;
   newFeature?: boolean;
   iconNewFeature?: string;
   children?: Permission[];
}

export interface Role {
   id: string;
   name: string;
   label: string;
   status: BasicStatus;
   order?: number;
   desc?: string;
   permission?: Permission[];
}

export interface SalesChannel {
   id: string;
   name: string;
   phone: string;
   email: string;
   street: string;
   city: string;
   ward: string;
   creator_name: string;
   company: string;
   supplierGroup: string;
   notes?: string;
}

export interface Voucher {
   code: string;
   name: string;
   type: string;
   value: string;
   startDate: string;
   endDate: string;
   maxUsage: number;
   conditions: string;
   status: string;
   userType: string;
   isSingleUse: boolean;
   description: string;
}

export interface Backup {
   fileName: string;
   fileSize: number;
   location: string;
   restoreAvailable: boolean;
}
