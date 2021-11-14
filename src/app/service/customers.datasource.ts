import { CustomerService } from './customer.service';

import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import { Customer } from '../model/customer';

export class CustomersDataSource implements DataSource<Customer> {

    private customersSubject = new BehaviorSubject<Customer[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private customerService: CustomerService) {}

    connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
        return this.customersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.customersSubject.complete();
        this.loadingSubject.complete();
    }

    loadCustomers(pageNumber = 0,  pageSize = 3, sortKey = 'id', sortDirection = 'ASC') {

        this.loadingSubject.next(true);

        this.customerService.getCustomerPage(pageNumber, pageSize, sortKey, sortDirection).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(customers => this.customersSubject.next(customers));
    }    
}
