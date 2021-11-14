import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomersDataSource } from 'src/app/service/customers.datasource';

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from "rxjs";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  dataSource!: CustomersDataSource;
  displayedColumns = ['image', 'firstName', 'lastName', 'address', 'city', 'country', 'email'];
  tableSizes = [5, 10, 15, 20];
  tableSize: any = this.tableSizes[0];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @Input('mat-sort-header') id: string;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.dataSource = new CustomersDataSource(this.customerService);
    this.dataSource.loadCustomers(1, 5, 'id', 'ASC');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCustomersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCustomersPage())
      )
      .subscribe();

  }

  loadCustomersPage() {    
    this.dataSource.loadCustomers(
      this.paginator.pageIndex,
      this.paginator.pageSize,      
      this.sort.active,
      this.sort.direction
    );
  }

}
