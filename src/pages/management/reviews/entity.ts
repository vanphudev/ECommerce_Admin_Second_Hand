export interface UserInfo {
    userId: string;
    email?: string;
    phone?: string;
    fullName?: string;
    gender?: 'male' | 'female' | 'other';
    birthday?: string;
    username?: string;
    profileImage?: string;
}

export interface Item {
    productId: string;
    productName: string;
    description?: string;
    productImage: string;
    price: number;
    quantity?: number;
}

export interface Reviews {
    reviewId: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;          
    updatedAt: string;          
    isVerifiedPurchase: boolean;
    user?: UserInfo;
    product?: Item;
}
