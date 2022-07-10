import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(private router:Router){

  }
  open = false;

  readonly backOfficeManagerMenu = [
    {
      name:'Product',
      link:'dashboard/product'
    },
    {
      name:'Multi Product',
      link:'dashboard/multi-product'
    },
    {
      name:'Deal Product',
      link:'dashboard/deal-product'
    },
    {
      name:'Orders',
      link:'dashboard/orders'
    },
    {
      name:'Customer Insight',
      link:'dashboard/customer-insight'
    }
    
  ];

  readonly customerManagerMenu = [
    {
      name:'Product',
      link:'dashboard/product'
    },
    {
      name:'Multi Product',
      link:'dashboard/multi-product'
    },
    {
      name:'Deal Product',
      link:'dashboard/deal-product'
    },
    {
      name:'Orders',
      link:'dashboard/orders'
    },
    {
      name:'Customer Insight',
      link:'dashboard/customer-insight'
    }
    
  ];
  readonly marketingManagerMenu = [
    {
      name:'Product',
      link:'dashboard/product'
    },
    {
      name:'Multi Product',
      link:'dashboard/multi-product'
    },
    {
      name:'Deal Product',
      link:'dashboard/deal-product'
    },
    {
      name:'Orders',
      link:'dashboard/orders'
    },
    {
      name:'Customer Insight',
      link:'dashboard/customer-insight'
    }
    
  ];
  readonly warehouseManagerMenu = [
    {
      name:'Product',
      link:'dashboard/product'
    },
    {
      name:'Multi Product',
      link:'dashboard/multi-product'
    },
    {
      name:'Deal Product',
      link:'dashboard/deal-product'
    },
    {
      name:'Orders',
      link:'dashboard/orders'
    },
    {
      name:'Customer Insight',
      link:'dashboard/customer-insight'
    }
    
  ];

  readonly tinkoff = [
    'Taiga-UI',
    'ng-event-plugins',
    'ng-polymorpheus',
    'ng-dompurify',
  ];

  toggle(open: any): void {
    this.open = open;
  }

  move(link:string){
    this.router.navigate([link]);

  }

  ngOnInit(): void {}
}
