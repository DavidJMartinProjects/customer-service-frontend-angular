import { CustomerPage } from './../../model/customer-page.model';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent, BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  
  customerPage: any;
  tableSizes = [5, 10, 15, 20];
  tableSize: number = 5;
  pageNumber: number = 0;
  sortKey = 'id';
  sortDirection = 'asc';

  displayedColumns = ['image', 'id', 'firstName', 'lastName', 'address', 'city', 'country', 'email'];
  
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchCustomers(this.pageNumber, this.tableSize, this.sortKey, this.sortDirection);
  }

  fetchCustomers(pageNumber: number, tableSize: number, sortKey: string, sortDirection: string) {
    this.customerService.getCustomerPage(pageNumber, tableSize, sortKey, sortDirection).subscribe(
      data => {
        this.customerPage = data;
      }
    )
  }

  onPageChanged(event: PageEvent) {
    this.tableSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.tableSize = event.pageSize;    
    this.fetchCustomers(this.pageNumber, this.tableSize, this.sortKey, this.sortDirection);
  }

  onSortChange(sortEvent: Sort) {
    console.log("sortEvent" + sortEvent.active);
    console.log("sortEvent" + sortEvent.direction);
    this.sortKey = sortEvent.active;
    this.sortDirection = sortEvent.direction;
    this.fetchCustomers(this.pageNumber, this.tableSize, this.sortKey, this.sortDirection);
  }

}
