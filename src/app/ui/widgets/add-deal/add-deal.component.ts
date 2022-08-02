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

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss'],
})
export class AddDealComponent implements OnInit {
  dealProduct: DealProduct = {} as DealProduct;
  selectedDealType = '';
  dealTypes = [
    'FLASH',
    'SALES',
    'WEEKLY_DEAL',
    'SUPER_DEAL',
    'ONLY_COIN_DEAL',
    'EXCLUSIVE_DEAL',
    'MEMBER_DEAL',
    'PRIME_MEMBER_DEAL',
    'CUSTOM_RULE_DEAL',
  ];
  selectedDealDays: number[] = [];
  dealWeekDays = [
    {
      name: 'Mon',
      value: 1,
    },
    {
      name: 'Tue',
      value: 2,
    },
    {
      name: 'Wed',
      value: 3,
    },
    {
      name: 'Thu',
      value: 4,
    },
    {
      name: 'Fri',
      value: 5,
    },
    {
      name: 'Sat',
      value: 6,
    },
    {
      name: 'Sun',
      value: 7,
    },
  ];
  discountPercent = 0;
  productSummary: ProductSummary = {} as ProductSummary;
  constructor(
    private clientService: ClientService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, ProductSummary[]>,
    private changeDetect: ChangeDetectorRef,
    private _dateFormatter: DateTimeProvider,
    private _notify: NotificationService
  ) {
    this.productSummary = context.data[0];
    if (!this.dealProduct.dealPrice) {
      this.dealProduct.dealPrice = this.productSummary.varient.price;
    }
    if (!this.dealProduct.ruleConfig) {
      this.dealProduct.ruleConfig = {} as RuleConfig;
    }
  }

  priceChange(changeOn: string) {
    if (changeOn == 'discount') {
      if (
        +this.dealProduct.dealPrice.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.dealProduct.dealPrice.offerPrice =
          +this.dealProduct.dealPrice.actualPrice -
          (+this.discountPercent * +this.dealProduct.dealPrice.actualPrice) /
            100;
      }
    } else if (changeOn == 'offer') {
      if (
        +this.dealProduct.dealPrice.actualPrice > 0 &&
        +this.dealProduct.dealPrice.offerPrice > 0
      ) {
        this.discountPercent =
          ((+this.dealProduct.dealPrice.actualPrice -
            this.dealProduct.dealPrice.offerPrice) *
            100) /
          +this.dealProduct.dealPrice.actualPrice;
      }
    } else {
      if (
        +this.dealProduct.dealPrice.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.dealProduct.dealPrice.offerPrice =
          +this.dealProduct.dealPrice.actualPrice -
          (+this.discountPercent * +this.dealProduct.dealPrice.actualPrice) /
            100;
      }
    }
  }

  async save() {
    if (!this.dealProduct.imageId) {
      this._notify.error({
        message: 'Image id not available.',
      });
      return;
    } else if (!this.dealProduct.type) {
      this._notify.error({
        message: 'Deal type required.',
      });
      return;
    } else if (this.selectedDealDays.length == 0) {
      this._notify.error({
        message: 'Deal days should be selected',
      });
      return;
    } else if (!this.dealProduct.dealPrice.offerPrice) {
      this._notify.error({
        message: 'Offer price required.',
      });
      return;
    }
    this.dealProduct.ruleConfig.willStartAt =
      this._dateFormatter.convertDateTimeFormat(
        this.dealProduct.ruleConfig.willStartAt,
        DatetimeFormatEnum.FULL_DATE_TIME_LOCAL,
        DatetimeFormatEnum.FULL_DATE_TIME_ZONED
      );
    this.dealProduct.ruleConfig.willExpireAt =
      this._dateFormatter.convertDateTimeFormat(
        this.dealProduct.ruleConfig.willExpireAt,
        DatetimeFormatEnum.FULL_DATE_TIME_LOCAL,
        DatetimeFormatEnum.FULL_DATE_TIME_ZONED
      );
    this.dealProduct.product = this.productSummary;
    await this.clientService.post('dealProduct', this.dealProduct);
    this._notify.success({ message: 'Deal created' });
    this.context.completeWith(undefined);
  }

  ngOnInit(): void {}
}
