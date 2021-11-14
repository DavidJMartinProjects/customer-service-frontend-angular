import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Customer } from '../model/customer';
import { CustomerPage } from '../model/customer-page.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = 'http://localhost:8080/customers';

  status: any;
  errorMessage: any;

  constructor(private httpClient: HttpClient) { }

  getCustomerPage(pageNumber: number, pageSize: number, sortKey: string, sortDirection: string): Observable<CustomerPage> {
    console.info("pageSize: " + pageSize + ", pageNumber: " + pageNumber);
    console.info("sortKey: " + sortKey + ", sortDirection: " + sortDirection);
    var query = `?pageNumber=${pageNumber}&pageSize=${pageSize}&sortKey=${sortKey}&sortDirection=${sortDirection}`;

    return this.httpClient.get<CustomerPage>(this.baseUrl + query);
  }

  remove(id: string) {
    var uri = this.baseUrl + "/" + (id);
    return this.httpClient.delete(uri);
  }

}
