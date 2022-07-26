import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tuiAssertIsHTMLElement } from '@taiga-ui/cdk';
import { Dimension, PriceInfo, VarientProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-varient',
  templateUrl: './product-varient.component.html',
  styleUrls: ['./product-varient.component.scss'],
})
export class ProductVarientComponent implements OnInit {
  productVarient: VarientProduct = {} as VarientProduct;
  @Input()
  backOffice=false;
  addDimension: boolean = false;
  measurementUnit: string[] = [];
  discountPercent = 0;
  @Output()
  onVarientAdd: EventEmitter<VarientProduct> = new EventEmitter();
  constructor() {
    this.measurementUnit.push('KILO_GRAM');
    this.measurementUnit.push('GRAM');
    this.measurementUnit.push('LITRE');
    this.measurementUnit.push('MILI_GRAM');
    this.measurementUnit.push('PIECE');
  }

  ngOnInit(): void {
    if (!this.productVarient.price) {
      this.productVarient.price = {} as PriceInfo;
    }
  }

  priceChange(changeOn: string) {
    if (changeOn == 'discount') {
      if (
        +this.productVarient.price.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.productVarient.price.offerPrice =
          +this.productVarient.price.actualPrice -
          (+this.discountPercent * +this.productVarient.price.actualPrice) /
            100;
      }
    } else if (changeOn == 'offer') {
      if (
        +this.productVarient.price.actualPrice > 0 &&
        +this.productVarient.price.offerPrice > 0
      ) {
        this.discountPercent =
          ((+this.productVarient.price.actualPrice -
            this.productVarient.price.offerPrice) *
            100) /
          +this.productVarient.price.actualPrice;
      }
    } else {
      if (
        +this.productVarient.price.actualPrice > 0 &&
        +this.discountPercent > 0
      ) {
        this.productVarient.price.offerPrice =
          +this.productVarient.price.actualPrice -
          (+this.discountPercent * +this.productVarient.price.actualPrice) /
            100;
      }
    }
  }

  save() {
    this.onVarientAdd.emit(this.productVarient);
  }

  onDimensionAdd() {
    if (this.addDimension) {
      this.productVarient.dimension = {} as Dimension;
    }
  }

  getMeasurementUnit(unit: string) {
    return unit.replace('_', ' ').toLowerCase();
  }
}
