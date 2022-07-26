import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { AppSession } from 'src/app/utils/app-session';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CountrySelectComponent } from '../../widgets/country-select/country-select.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  country: any = {};
  constructor(
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
  open = false;

  readonly backOfficeManagerMenu = [
    {
      name: 'Product',
      link: 'dashboard/product',
    },
    {
      name: 'Product Category',
      link: 'dashboard/product-category',
    },
    {
      name: 'Brand',
      link: 'dashboard/product-brand',
    },
    {
      name: 'Multi Product',
      link: 'dashboard/multi-product',
    },
    {
      name: 'Deal Product',
      link: 'dashboard/deal-product',
    },
    {
      name: 'Orders',
      link: 'dashboard/orders',
    },
    {
      name: 'Customer Insight',
      link: 'dashboard/customer-insight',
    },
  ];

  readonly customerManagerMenu = [
    {
      name: 'Product',
      link: 'dashboard/product',
    },
    {
      name: 'Multi Product',
      link: 'dashboard/multi-product',
    },
    {
      name: 'Deal Product',
      link: 'dashboard/deal-product',
    },
    {
      name: 'Orders',
      link: 'dashboard/orders',
    },
    {
      name: 'Customer Insight',
      link: 'dashboard/customer-insight',
    },
  ];
  readonly marketingManagerMenu = [
    {
      name: 'Product',
      link: 'dashboard/product',
    },
    {
      name: 'Multi Product',
      link: 'dashboard/multi-product',
    },
    {
      name: 'Deal Product',
      link: 'dashboard/deal-product',
    },
    {
      name: 'Orders',
      link: 'dashboard/orders',
    },
    {
      name: 'Customer Insight',
      link: 'dashboard/customer-insight',
    },
  ];
  readonly warehouseManagerMenu = [
    {
      name: 'Inventory',
      link: 'dashboard/inventory',
    },
    {
      name: 'Purchase',
      link: 'dashboard/purchase',
    },
    {
      name: 'Warehouse',
      link: 'dashboard/warehouse',
    },
    {
      name: 'Orders',
      link: 'dashboard/orders',
    },
    {
      name: 'Customer Insight',
      link: 'dashboard/customer-insight',
    },
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

  move(link: string) {
    this.router.navigate([link]);
  }

  ngOnInit(): void {
    this.country = AppSession.getValue(AppSession.Country);
  }
  openCountry() {
    this.dialogService
      .open(new PolymorpheusComponent(CountrySelectComponent, this.injector), {
        size: 'l',
        closeable: true,
        dismissible: false,
        data: this.country,
      })
      .subscribe();
  }
}
