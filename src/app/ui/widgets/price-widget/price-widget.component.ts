import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PriceInfo } from 'src/app/models/product';

@Component({
  selector: 'app-price-widget',
  templateUrl: './price-widget.component.html',
  styleUrls: ['./price-widget.component.scss'],
})
export class PriceWidgetComponent implements OnInit {
  @Input()
  price: PriceInfo = {} as PriceInfo;
  @Output()
  priceChange: EventEmitter<PriceInfo> = new EventEmitter();
  discountPercent = 0;
  constructor() {}

  ngOnInit(): void {
    this.change('offer');
  }
  change(changeOn: string) {
    if (changeOn == 'discount') {
      if (+this.price.actualPrice > 0 && +this.discountPercent > 0) {
        this.price.offerPrice =
          +this.price.actualPrice -
          (+this.discountPercent * +this.price.actualPrice) / 100;
      }
    } else if (changeOn == 'offer') {
      if (+this.price.actualPrice > 0 && +this.price.offerPrice > 0) {
        this.discountPercent = Math.ceil(
          ((+this.price.actualPrice - this.price.offerPrice) * 100) /
            +this.price.actualPrice
        );
      }
    } else {
      if (+this.price.actualPrice > 0 && +this.discountPercent > 0) {
        this.price.offerPrice =
          +this.price.actualPrice -
          (+this.discountPercent * +this.price.actualPrice) / 100;
      }
    }
  }
}
