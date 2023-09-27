import { Account } from "./account.interface";

export interface User{
    firstName: string;

    lastName: string;

    phone: string;

    accounts: Account[];
}