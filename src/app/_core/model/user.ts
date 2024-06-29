import { BaseEntity } from "./base";

export interface User {
    pagingData: PagingData;
}

export interface PagingData {
    content: [UserModel];
    pageable: Pageable;
    totalElements: number;
    totalPages?: number;
    size?: number;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
}

export class UserModel extends BaseEntity {
    id: number;
    username: string;
    password: string;
    fullName: string;
    phone: string;
    email: string;
    lastLoginTime: Date;
    isChecked: Boolean;

    constructor() {
        super();
        this.id = 0;
        this.username = '';
        this.password = '';
        this.fullName = '';
        this.phone = '';
        this.email = '';
        this.lastLoginTime = new Date();
        this.isChecked = false;

    }

}