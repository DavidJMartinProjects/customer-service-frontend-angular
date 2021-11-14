import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerPage } from '../model/customer-page.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }

  getCustomerPage(pageNumber: number, pageSize: number, sortKey: string, sortDirection: string): Observable<CustomerPage> {
    var query = `?pageNumber=${pageNumber}&pageSize=${pageSize}&sortKey=${sortKey}&sortDirection=${sortDirection}`;
    console.log("GET: " + this.baseUrl + query)
    return this.httpClient.get<CustomerPage>(this.baseUrl + query);
  }

  remove(id: string) {
    var uri = this.baseUrl + "/" + (id);
    return this.httpClient.delete(uri);
  }

}
