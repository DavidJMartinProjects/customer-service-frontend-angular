import { CustomerService } from 'src/app/service/customer.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  
  customerPage: any;  
  pageSizes = [5, 10, 15, 20];
  displayedColumns = ['image', 'id', 'firstName', 'lastName', 'address', 'city', 'country', 'email'];

  pageSize: number = 5;
  pageNumber: number = 0;
  sortKey = 'id';
  sortDirection = 'asc';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers(this.pageNumber, this.pageSize, this.sortKey, this.sortDirection);
  }

  fetchCustomers(pageNumber: number, pageSize: number, sortKey: string, sortDirection: string) {
    this.customerService.getCustomerPage(pageNumber, pageSize, sortKey, sortDirection).subscribe(
      data => {
        this.customerPage = data;
      }
    )
  }

  onPageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;    
    this.fetchCustomers(this.pageNumber, this.pageSize, this.sortKey, this.sortDirection);
  }

  onSortChange(sortEvent: Sort) {
    this.sortKey = sortEvent.active;
    this.sortDirection = sortEvent.direction;
    this.fetchCustomers(this.pageNumber, this.pageSize, this.sortKey, this.sortDirection);
  }

}
