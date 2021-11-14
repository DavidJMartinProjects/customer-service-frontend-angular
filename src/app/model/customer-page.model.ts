import { Customer } from "./customer";


export interface CustomerPage {

    customers: Customer[];
    totalElements: number;
    totalPages: number;

}
