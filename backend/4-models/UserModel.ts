
export enum UserRole {
    ADMIN, USER
}

export interface UserModel {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role?: UserRole
}