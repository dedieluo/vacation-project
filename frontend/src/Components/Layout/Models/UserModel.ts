
export enum UserRole {
    ADMIN="ADMIN", 
    USER="USER"
}


export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole
}