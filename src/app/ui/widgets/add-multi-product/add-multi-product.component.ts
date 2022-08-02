import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { DealProduct, RuleConfig } from 'src/app/models/deal-product';
import { ClientService } from 'src/app/service/client-service.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { PriceInfo, Product, ProductSummary } from 'src/app/models/product';
import {
  DatetimeFormatEnum,
  DateTimeProvider,
} from 'src/app/utils/time.provider';
import { NotificationService } from 'src/app/utils/notification-service';
import { MultiProductPageComponent } from '../../pages/multi-product-page/multi-product-page.component';
import { MultiProduct } from 'src/app/models/multi-product';

@Component({
  selector: 'app-add-multi-product',
  templateUrl: './add-multi-product.component.html',
  styleUrls: ['./add-multi-product.component.scss'],
})
export class AddMultiProductComponent implements OnInit {
  multiProduct: MultiProduct = {} as MultiProduct;
  discountPercent = 0;
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private changeDetect: ChangeDetectorRef,
    private _dateFormatter: DateTimeProvider,
    private _notify: NotificationService
  ) {
    this.multiProduct.products = context.data.products;
    this.multiProduct.type = context.data.type;
    this.multiProduct.type = this.multiProduct.type.toLocaleUpperCase();
    if (!this.multiProduct.price) {
      this.multiProduct.price = {} as PriceInfo;
      for (let product of this.multiProduct.products) {
        this.multiProduct.price.actualPrice +=
          product.varient.price.actualPrice;
        this.multiProduct.price.offerPrice += product.varient.price.offerPrice;
        this.multiProduct.price.memberCoin += product.varient.price.memberCoin;
        this.multiProduct.price.silverMemberCoin +=
          product.varient.price.silverMemberCoin;
        this.multiProduct.price.goldMemberCoin +=
          product.varient.price.goldMemberCoin;
        this.multiProduct.price.primeMemberCoin +=
          product.varient.price.primeMemberCoin;
      }
    }
  }

  priceChange(changeOn: string) {
    if (changeOn == 'discount') {
      if (
        +this.multiProduct.price.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.multiProduct.price.offerPrice =
          +this.multiProduct.price.actualPrice -
          (+this.discountPercent * +this.multiProduct.price.actualPrice) / 100;
      }
    } else if (changeOn == 'offer') {
      if (
        +this.multiProduct.price.actualPrice > 0 &&
        +this.multiProduct.price.offerPrice > 0
      ) {
        this.discountPercent =
          ((+this.multiProduct.price.actualPrice -
            this.multiProduct.price.offerPrice) *
            100) /
          +this.multiProduct.price.actualPrice;
      }
    } else {
      if (
        +this.multiProduct.price.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.multiProduct.price.offerPrice =
          +this.multiProduct.price.actualPrice -
          (+this.discountPercent * +this.multiProduct.price.actualPrice) / 100;
      }
    }
  }

  async save() {
    if (!this.multiProduct.displayImageId) {
      this._notify.error({
        message: 'Image id not available.',
      });
      return;
    } else if (!this.multiProduct.type) {
      this._notify.error({
        message: 'Deal type required.',
      });
      return;
    } else if (!this.multiProduct.price.offerPrice) {
      this._notify.error({
        message: 'Offer price required.',
      });
      return;
    }
    this.multiProduct.active = true;
    await this.clientService.post('multiProduct', this.multiProduct);
    this._notify.success({
      message: this.multiProduct.type.toLocaleLowerCase() + ' created',
    });
    this.context.completeWith(undefined);
  }

  ngOnInit(): void {}
}
