export interface User {
    userId: string;
    email?: string;
    phone?: string;
    fullName?: string;
    gender?: 'male' | 'female' | 'other';
    birthday?: string;
    username?: string;
    profileImage?: string;
}