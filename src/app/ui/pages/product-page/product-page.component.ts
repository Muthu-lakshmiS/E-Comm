import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';

import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  Product,
  ProductSummary,
  VarientProduct,
} from 'src/app/models/product';
import { ClientService } from 'src/app/service/client-service.service';
import { AddDealComponent } from '../../widgets/add-deal/add-deal.component';
import { AddMultiProductComponent } from '../../widgets/add-multi-product/add-multi-product.component';
import { AddProductComponent } from '../../widgets/add-product/add-product.component';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  selectedVarient: ProductSummary[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.search();
  }
  async search() {
    this.products = await this._clientService.post('product/search', {});
  }

  addVarient(varient: ProductSummary) {
    this.selectedVarient.push(varient);
  }
  removeVarient(productVarientId: string) {
    this.selectedVarient = this.selectedVarient.filter((item) => {
      return item._id + '@' + item.varient.varientCode !== productVarientId;
    });
  }

  event(eventName: any) {
    if (eventName.event == 'add') {
      this.dialogService
        .open(new PolymorpheusComponent(AddProductComponent, this.injector), {
          size: 'page',
          closeable: true,
          dismissible: false,
        })
        .subscribe();
    }
  }

  createDeal() {
    this.dialogService
      .open(new PolymorpheusComponent(AddDealComponent, this.injector), {
        size: 'auto',
        closeable: true,
        dismissible: false,
        data: this.selectedVarient,
      })
      .subscribe();
  }
  createMultiProduct(type: string) {
    this.dialogService
      .open(
        new PolymorpheusComponent(AddMultiProductComponent, this.injector),
        {
          size: 'auto',
          closeable: true,
          dismissible: false,
          data: {
            type: type,
            products: this.selectedVarient,
          },
        }
      )
      .subscribe();
  }
}
