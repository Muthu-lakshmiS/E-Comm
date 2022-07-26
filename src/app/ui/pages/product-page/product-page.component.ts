import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';

import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Product, VarientProduct } from 'src/app/models/product';
import { ClientService } from 'src/app/service/client-service.service';
import { AddProductComponent } from '../../widgets/add-product/add-product.component';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  selectedVarient: VarientProduct[] = [];
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

  addVarient(varient: VarientProduct) {
    this.selectedVarient.push(varient);
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
}
