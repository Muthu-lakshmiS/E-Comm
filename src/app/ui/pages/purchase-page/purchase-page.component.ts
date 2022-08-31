import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Purchase } from 'src/app/models/purchase';
import { ClientService } from 'src/app/service/client-service.service';
import { AnimeUtil } from 'src/app/utils/animation-lottie';
import { AddProductCategoryComponent } from '../../widgets/add-product-category/add-product-category.component';
import { AddPurchaseComponent } from '../../widgets/add-purchase/add-purchase.component';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.scss'],
})
export class PurchasePageComponent implements OnInit {
  purchases: Purchase[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private _clientService: ClientService
  ) {}

  event(eventName: any) {
    if (eventName.event == 'add') {
      this.dialogService
        .open(new PolymorpheusComponent(AddPurchaseComponent, this.injector), {
          size: 'page',
          closeable: true,
          dismissible: false,
        })
        .subscribe((resp) => {
          location.reload();
        });
    }
  }

  getHeaderAnime() {
    return AnimeUtil.purchaseAnime;
  }

  ngOnInit(): void {
    this.search();
  }
  async search() {
    this.purchases = await this._clientService.post<Purchase[]>(
      'purchase/search',
      {}
    );
  }
}
