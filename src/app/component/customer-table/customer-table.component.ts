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
  pageSizes = [4, 9];
  displayedColumns = ['image', 'id', 'firstName', 'lastName', 'address', 'city', 'country', 'email'];

  pageNumber: number = 0;
  pageSize: number = 9;
  sortKey = 'id';
  sortDirection = 'asc';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerService.getCustomerPage(this.pageNumber, this.pageSize, this.sortKey, this.sortDirection)
      .subscribe(
        data => {
          this.customerPage = data;
        }
      )
  }

  onPageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;    
    this.fetchCustomers();
  }

  onSortChange(sortEvent: Sort) {
    this.sortKey = sortEvent.active;
    this.sortDirection = sortEvent.direction;
    this.fetchCustomers();
  }

}
